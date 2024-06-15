import { AIMessage, MessageContent } from "langchain/schema";

export type ReducedTrace = {
  trafficData: {
    count: number;
    firstOccurrence: Date;
    lastOccurrence: Date;
  };
  traceLog?: string;
  errorLog?: string;
};

export type LLMLogObject = {
  trafficData: string;
  traceLog: string;
  errorLog: string;
  reportProps: SwitchStates
};

export type ErrorReportResp = {
  title: string;
  content: MessageContent;
  meta: ResponseMeta
};

export type ResponseMeta = {
  tokenCount: any
  runId: string
  respTime: number
}

export type AIMessageWithMeta = AIMessage & {
  response_metadata: ResponseMeta;
};

export type SwitchStates = {
  traffic: boolean;
  snippets: boolean;
  actionPlan: boolean;
  [key: string]: boolean;
}

export type LLMInput = {
  file: any,
  reportProps: SwitchStates
}

export type PromptInput = {
  errorLogGroups: LLMLogObject
  reportProps: SwitchStates
}