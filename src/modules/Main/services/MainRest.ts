import { AuthRest } from 'modules/Auth/services/AuthRest'
import { container, singleton } from 'tsyringe'

interface ICreateTodoParams {
  title?: string
  description?: string
  finishDate?: string
  status: string
  priority?: string
  creator?: string
  worker?: string
}

interface IUpdateTodo extends Omit<ICreateTodoParams, 'creator'> {
  id: number
}

@singleton()
export class MainRest extends AuthRest {
  async createTodo(params: ICreateTodoParams) {
    const { data } = await this.authHttp.post('/api/todo', params)

    return data
  }

  async fetchTodo() {
    const { data } = await this.authHttp.get('/api/todo')

    return data
  }

  async updateTodo(params: IUpdateTodo) {
    const { data } = await this.authHttp.put('./api/todo', params)

    return data
  }
}

export const useMainRest = () => container.resolve(MainRest)
