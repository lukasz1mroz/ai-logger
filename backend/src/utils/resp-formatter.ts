import { AIMessageWithMeta, ErrorReportResp} from '../types/types.js'

export const formatResponse = (llmResp: AIMessageWithMeta, idx: number): ErrorReportResp => {
    const parentheses = /(\(|\))/g;
    const formattedContent = (llmResp.content as string).replace(parentheses, (match) => match === '(' ? '{' : '}')
    return {title: `Error ${idx + 1}`, content: formattedContent, meta: llmResp.response_metadata}
}