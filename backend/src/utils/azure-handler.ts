import {ChatOpenAI} from '@langchain/openai'
import {config} from '../config/config.js'

const {apiVersion, apiKey, baseUrl, completionsModel} = config.api

export const llm = new ChatOpenAI({
  azureOpenAIApiKey: apiKey,
  azureOpenAIApiVersion: apiVersion,
  azureOpenAIApiDeploymentName: completionsModel,
  azureOpenAIBasePath: baseUrl,
  temperature: 0.1,
})
