import { observer } from 'mobx-react-lite'
import { ITodoItemProps } from './types'

import styles from './TodoItem.module.scss'
import { Typography } from 'ui/Typography'

import cn from 'classnames'

const TodoItem = ({
  title,
  description,
  finishDate,
  priority,
  status,
  worker,
  id,
  onClick,
}: ITodoItemProps) => {
  const titleClassNames = cn(
    status === 'Выполнена' && styles.success,
    finishDate < new Date().toLocaleDateString() && styles.overdue,
    styles.title,
  )

  return (
    <div className={styles.item} onClick={() => onClick(id)}>
      <div>
        Заголовок
        <Typography size={14} className={titleClassNames}>
          {title}
        </Typography>
      </div>
      <div>
        Описание
        <Typography size={14} className={styles.descr}>
          {description}
        </Typography>
      </div>
      <div>
        Дата окончания
        <Typography size={14} className={styles.column}>
          {finishDate}
        </Typography>
      </div>
      <div>
        Приоритет
        <Typography size={14} className={styles.column}>
          {priority}
        </Typography>
      </div>
      <div>
        Статус
        <Typography size={14} className={styles.column}>
          {status}
        </Typography>
      </div>
      <div>
        Ответственный
        <Typography size={14} className={styles.column}>
          {worker}
        </Typography>
      </div>
    </div>
  )
}

export default observer(TodoItem)
