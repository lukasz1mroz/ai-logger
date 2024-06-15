export const readFileAsDataURL = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onloadend = () => {
    const [, encoded] = (reader.result as string).split(',')
    resolve(encoded)
  }
  reader.onerror = () => reject(new Error('File reading failed'))
  reader.readAsDataURL(file)
})

// Prepare data to be sent by binary stream
export const prepareFormData = (file: File, reportProps: any): FormData => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('reportProps', JSON.stringify(reportProps))
  console.log('formdata: ', formData)
  return formData
}
