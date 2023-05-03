import Input from 'ui/Input/Input'
import { Typography } from 'ui/Typography'
import { IModalProps } from './types'
import { useAuthStore } from 'modules/Auth/store/AuthStore'
import { useEffect } from 'react'
import cn from 'classnames'

import styles from './Modal.module.scss'
import Button from 'ui/Button/Button'
import { observer } from 'mobx-react-lite'
import useModal from './hooks/useModal'

const Modal = ({ id, className, onClick }: IModalProps) => {
  const authStore = useAuthStore()
  const {
    title,
    description,
    finishDate,
    status,
    priority,
    worker,
    setInitialData,
    onCloseModal,
    handleChange,
    onSubmit,
    isDisabled,
  } = useModal({ onClick, id })

  useEffect(() => {
    if (id) {
      setInitialData()
    }
  }, [id])

  const modalClassNames = cn(styles.modal, className)
  const layoutClassNames = cn(styles.layout, className)

  return (
    <div className={layoutClassNames}>
      <div className={modalClassNames}>
        <div className={styles.modalHeader}>
          <Typography>Введите необходимые данные</Typography>
          <Button onClick={onCloseModal} size="small" title="Закрыть" />
        </div>
        <Input
          label="Заголовок"
          name="title"
          value={title}
          disabled={isDisabled()}
          onChange={handleChange}
        />
        <Input
          label="Описание"
          name="description"
          value={description}
          disabled={isDisabled()}
          onChange={handleChange}
        />
        <Input
          label="Дата окончания"
          name="finishDate"
          disabled={isDisabled()}
          value={finishDate}
          onChange={handleChange}
          contentSize="small"
        />
        <Input
          label="Приоритет (низкий, средний, высокий)"
          name="priority"
          disabled={isDisabled()}
          value={priority}
          onChange={handleChange}
        />
        <Input
          label="Статус (к выполнению, выполняется, выполнена, отменена)"
          name="status"
          value={status}
          onChange={handleChange}
        />
        <Input
          label="Ответственный"
          name="worker"
          disabled={isDisabled()}
          value={
            authStore.user?.role === 'MANAGER' ? worker : authStore.user?.name
          }
          onChange={handleChange}
        />
        <Button
          onClick={onSubmit}
          className={styles.button}
          title="Подтвердить"
        />
      </div>
    </div>
  )
}

export default observer(Modal)
