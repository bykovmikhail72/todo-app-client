export type TPriority = 'Высокий' | 'Средний' | 'Низкий'

export type TStatus = 'К выполнению' | 'Выполняется' | 'Выполнена' | 'Отменена'

export interface ITodoItemProps {
  title?: string
  id?: number
  description?: string
  finishDate?: string
  createDate?: string
  updateDate?: string
  priority?: TPriority
  status?: TStatus
  creator?: string
  worker?: string
  onClick?: (id?: number) => void
}
