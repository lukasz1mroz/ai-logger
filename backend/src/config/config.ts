export const config: any = {
  api: {
    apiVersion: process.env.API_VERSION,
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL,
    completionsModel: process.env.COMPLETIONS_MODEL,
  },
  reportLimit: 20,
}
