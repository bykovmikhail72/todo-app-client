import { makeAutoObservable } from 'mobx'
import { MainRest } from '../services/MainRest'
import { container, singleton } from 'tsyringe'

@singleton()
export class MainStore {
  mainRest = container.resolve(MainRest)
  todo? = undefined

  constructor() {
    makeAutoObservable<MainStore, 'mainRest'>(this, { mainRest: false })
  }

  private setTodo(data) {
    this.todo = data
  }

  async getTodo() {
    const data = await this.mainRest.fetchTodo()

    this.setTodo(data)
  }
}

export const useMainStore = () => container.resolve(MainStore)
