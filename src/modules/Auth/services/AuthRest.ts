import { container, singleton } from 'tsyringe'
import { AbstractRest } from '../../../services/AbstractRest'
import jwt_decode from 'jwt-decode'

export interface ILoginParams {
  email: string
  password: string
}

export const TOKEN = 'TOKEN'

@singleton()
export class AuthRest extends AbstractRest {
  error?: boolean = false
  private setAccessToken(token?: string) {
    this.http.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : ''
  }

  private setToken(token: string) {
    this.setAccessToken(token)

    localStorage.setItem(TOKEN, token)
  }

  async login(params: ILoginParams) {
    try {
      this.error = false
      const { data } = await this.http.post('/api/login', params)
      this.setToken(data.token)
      
      return jwt_decode(data.token)
    } catch (e) {
      this.error = true
      alert(e.response.data.message)
    }
  }

  async check() {
    const { data } = await this.authHttp.get('api/auth')
    localStorage.setItem(TOKEN, data.token)

    return jwt_decode(data.token)
  }

  async fetchOneUser(id: number) {
    const { data } = await this.authHttp.get(`api/user/` + id)

    return data
  }
}

export const useAuthRest = () => container.resolve(AuthRest)
