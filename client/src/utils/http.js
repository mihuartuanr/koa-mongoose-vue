import axios from 'axios'
import router from '@/router'
import { BASE_URL, TIMEOUT } from '@/config/http'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  validateStatus: function (status) {
    return status >= 200
  }
})

instance.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem('token')
  token && (config.headers['Authorization'] = `Bearer ${token}`)
  console.log('------request===========', config)
  return config
}, function (error) {
  console.log('------request===========', error)
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(
  async res => {
    if (/^20./.test(res.status)) {
      return res.data
    }
    if (/^40./.test(res.status)) {
      router.push('/')
      await localStorage.removeItem('token')
    }
    console.log('------response=======', res)
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
