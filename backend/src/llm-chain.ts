import {RunnableSequence} from 'langchain/schema/runnable'
import {errorLogFinalPrompt} from './utils/query-handler.js'
import {llm} from './utils/azure-handler.js'
import {formatResponse} from './utils/resp-formatter.js'
import {getErrorLogGroups} from './utils/log-formatter.js'
import {AIMessageWithMeta, ErrorReportResp, ResponseMeta} from './types/types.js'
import {Request} from 'express'

export const mainLLMCall = async (req: Request): Promise<ErrorReportResp[]> => {
  const file = (req.files as Array<any>)[0];
  const fileData = file.buffer;
  const reportProps = JSON.parse(req.body.reportProps);
  const errorLogGroupsWithReportProps = getErrorLogGroups(fileData, reportProps)
  const llmCall =  async (errorLogFinalPrompt: string) => {
    let respMetadata = {} as ResponseMeta
    const before = Date.now()
    const llmResp = await llm.invoke(errorLogFinalPrompt, {callbacks: [
      {
        handleLLMEnd(output, runId) {
          respMetadata.tokenCount = output.llmOutput?.tokenUsage
          respMetadata.runId = runId
        },
      }, 
    ]}) as any as AIMessageWithMeta
    const after = Date.now()
    respMetadata.respTime = (after - before) / 1000
    llmResp.response_metadata = respMetadata
    return llmResp
  }
  
  const llmChain = RunnableSequence.from([
    errorLogFinalPrompt,
    llmCall,
  ])

  const llmBatchResp = await llmChain.batch(errorLogGroupsWithReportProps)
  const formattedReports = llmBatchResp.map((llmResp, index) => formatResponse(llmResp, index))
  return formattedReports
}
