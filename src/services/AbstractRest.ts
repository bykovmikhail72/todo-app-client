import axios from 'axios'

import { TOKEN } from 'modules/Auth/services/AuthRest'

export const Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const AuthApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(TOKEN)}`
  return config
}
AuthApi.interceptors.request.use(authInterceptor)

export abstract class AbstractRest {
  protected readonly http = Api
  protected readonly authHttp = AuthApi
}
