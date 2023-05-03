import { makeAutoObservable } from 'mobx'
import { MainRest } from '../services/MainRest'
import { container, singleton } from 'tsyringe'
import { ITodo } from '../models/models'

@singleton()
export class MainStore {
  mainRest = container.resolve(MainRest)
  todo?: ITodo[] = undefined

  constructor() {
    makeAutoObservable<MainStore, 'mainRest'>(this, { mainRest: false })
  }

  private setTodo(data: ITodo[]) {
    this.todo = data
  }

  async getTodo() {
    const data = await this.mainRest.fetchTodo()

    this.setTodo(data)
  }
}

export const useMainStore = () => container.resolve(MainStore)
