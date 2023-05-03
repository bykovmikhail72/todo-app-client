import { makeAutoObservable } from 'mobx'
import { container, singleton } from 'tsyringe'
import { AuthRest } from '../services/AuthRest'
import { IUser } from '../models/models'

@singleton()
export class AuthStore {
  isAuthenticated?: boolean = false
  error?: boolean = false
  user?: IUser = undefined

  authRest = container.resolve(AuthRest)

  constructor() {
    makeAutoObservable(this)
  }

  async logout() {
    this.isAuthenticated = false
    localStorage.clear()
  }

  async handleSubmit({ email, password }) {
    const user = await this.authRest.login({ email, password })
    this.user = user
    if (!this.authRest.error) {
      this.isAuthenticated = true
    }
  }

  async check() {
    const user = await this.authRest.check()
    this.isAuthenticated = true
    this.user = user
  }

  async getOneUser(id: number) {
    const user = await this.authRest.fetchOneUser(id)
    this.user = user
  }
}

export const useAuthStore = () => container.resolve(AuthStore)
