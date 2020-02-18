import axios from 'axios'
import { BASE_URL, TIMEOUT } from '../config/http'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  validateStatus: function (status) {
    return status >= 200
  }
})

export default instance
