import { LLMLogObject, ReducedTrace, SwitchStates} from '../types/types.js'
import {config} from '../config/config.js'

export const getErrorLogGroups = (inputBuffer: Buffer, reportProps: SwitchStates) => {
  const text = inputBuffer.toString('utf-8');
  const jsonLStrings = text.split('\n')
  if (jsonLStrings[jsonLStrings.length - 1] === '') {
    jsonLStrings.pop();
  }
  const groupedErrorLogs = reduceLogs(jsonLStrings, 'timestamp', reportProps)
  return groupedErrorLogs
}

const reduceLogs = (logs: string[], dateProp: string, reportProps: SwitchStates): LLMLogObject[] => {
  const reducedTraces: Record<string, ReducedTrace> = {};
  const transactionIdTraces: Record<string, string> = {};
  const timestampRegex = /(?<="(timestamp)\\?":\\?")(.*?).*?(?=")/gi;
  const errRegex = /(err|fail|timeout)/gi
  const transactionIdRegex = /"transactionId":"([^"]*)"/;
  const msgRegex = /(?<="(message|msg)\\?":\\?")(.{0,100}?).*?(?=")/gi;
  const msgTimeRegex = /\d+\.\d+/g; 
  const hostRegex = /(?<="(host)\\?":\\?")(.{0,100}?).*?(?=")/gi;

  // Build error traces with log and trafficData or log traces if match by transactionId or key
  logs.forEach((log) => {
    const logMsg = log.match(msgRegex)?.[0];
    const logMsgNoTime = logMsg?.replace(msgTimeRegex, '') as string;
    const logHost = log.match(hostRegex)?.[0] as string
    const key = `MSG:${logMsgNoTime}HOST:${logHost}`

    const transactionIdMatch = log.match(transactionIdRegex);
    const transactionId = transactionIdMatch ? transactionIdMatch[1] : key;

    if (errRegex.test(log)) {
      const logParsedTime = new Date(log.match(timestampRegex)?.[0] as string)
      if (reducedTraces[transactionId]) {
          reducedTraces[transactionId].trafficData.count++;
          reducedTraces[transactionId].trafficData.lastOccurrence = reducedTraces[transactionId].trafficData.lastOccurrence < logParsedTime ? logParsedTime : reducedTraces[transactionId].trafficData.lastOccurrence;
          reducedTraces[transactionId].errorLog = log;
      } else {
          reducedTraces[transactionId] = {
            trafficData: {
              count: 1,
              firstOccurrence: logParsedTime,
              lastOccurrence: logParsedTime,
            },
            errorLog: log,
          };
      }
    } else {
      if (transactionIdMatch) {
        transactionIdTraces[transactionId] = transactionIdTraces[transactionId] || '';
        transactionIdTraces[transactionId] += log;
      }
    }
  });

  // Merge traces with error traces
  Object.entries(transactionIdTraces).forEach(([transactionId, traceLog]) => {
    if (reducedTraces[transactionId]) {
      reducedTraces[transactionId].traceLog = traceLog;
    }
  });

  // Get top x error traces by occurences
  const result: ReducedTrace[] = Object.values(reducedTraces)
    .sort((a, b) => b.trafficData.count - a.trafficData.count)
    .slice(0, config.reportLimit);

  // Prepare prompt format with parentheses
  const reducedTracesLLM: LLMLogObject[] = result.map((value) => ({
    trafficData: JSON.stringify(value.trafficData).replaceAll('{', '(').replaceAll('}', ')'),
    traceLog: value.traceLog ? value.traceLog.replaceAll('{', '(').replaceAll('}', ')') : 'no trace',
    errorLog: (value.errorLog as string).replaceAll('{', '(').replaceAll('}', ')'),
    reportProps: reportProps,
  }))

  return reducedTracesLLM
}