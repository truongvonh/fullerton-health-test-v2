import { isProduction } from '../utils/helper'
import { AUTH_KEY } from '../constants/localStorage'

const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: isProduction()
    ? 'https://salty-ravine-25324.herokuapp.com/api'
    : `http://localhost:5000/api`,
})

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem(AUTH_KEY.USER_TOKEN)
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
