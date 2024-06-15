import axios from 'axios'
import {prepareFormData} from './fileReader'
import {SwitchStates} from '../types'

const url = process.env.REACT_APP_API_URL

export const getFileReport = (inputFile: File, reportProps: SwitchStates) => {
  const formData = prepareFormData(inputFile, reportProps)

  return axios({
    url,
    method: 'POST',
    data: formData,
  })
}
