import { TPriority, TStatus } from '../components/types'

export interface ITodo {
  createdAt: string
  creator: string
  description: string
  finishDate: string
  id: number
  priority: TPriority
  status: TStatus
  title: string
  updatedAt: string
  userId: number
  worker: string
}
