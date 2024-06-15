import {PromptTemplate} from 'langchain/prompts'
import { LLMLogObject, SwitchStates } from '../types/types.js';

export const errorLogFinalPrompt = ({errorLog, traceLog, trafficData, reportProps}: LLMLogObject) => {
  const sections = [
    {
      condition: reportProps.traffic,
      title: 'Traffic Data',
      content: 'Summarize first and last occurrence times, total number of occurrences and always include failing files / functions / component names and response times.'
    },
    {
      condition: reportProps.snippets,
      title: 'Log Snippets',
      content: 'Insert only Error log data here in original format, don\'t include error trace logs.'
    },
    {
      condition: reportProps.actionPlan,
      title: 'Suggested Next Steps',
      content: 'Instruct reader which application code or web elements to check step by step and explain meaning of all error codes and give potential solutions based on online best practices. Bullet steps only by \'-\' and give minimum 5 steps.'
    },
  ];

  let filledTemplate = `Role: You are log analyst helping to describe the error in application log.

Task: Write exhaustive report for support teams describing the error based on provided Error log, Trace and Traffic data which will be in JSON format with parentheses instead of curly brackets. 

The report structure must contain only the below sections:

- 'Error Description' section will be an extensive description of the error and include all the details from error object. You will use `;

  sections.forEach(({condition, title, content}) => {
    if (condition) {
      filledTemplate += `\n- '${title}' section will ${content}`;
    }
  });

  filledTemplate += '\n\nExample report';

  sections.forEach(({condition, title}) => {
    if (condition) {
      filledTemplate += `\n\n${title}\n(${title} content here)`;
    }
  });

  filledTemplate += `\n\nThis concludes the sample report. Please remember to base your responses solely on actual log data, with the exception of the 'Suggested Next Steps' section. Format the response exactly as in above example.

Error log: ${errorLog}
Trace: ${traceLog}
Traffic: ${trafficData}
`;

  return PromptTemplate.fromTemplate(filledTemplate);
}