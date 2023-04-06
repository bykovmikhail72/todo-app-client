import Input from 'ui/Input/Input'
import { Typography } from 'ui/Typography'
import { IModalProps } from './types'
import { useAuthStore } from 'modules/Auth/store/AuthStore'
import { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'

import styles from './Modal.module.scss'
import Button from 'ui/Button/Button'
import { useMainRest } from 'modules/Main/services/MainRest'
import { observer } from 'mobx-react-lite'
import { useMainStore } from 'modules/Main/store/MainStore'

const Modal = ({ id, className, onClick }: IModalProps) => {
  const authStore = useAuthStore()
  const mainStore = useMainStore()
  const mainRest = useMainRest()
  const isDisabled = () => {
    if (authStore.user?.role === 'MANAGER') {
      return false
    } else {
      if (id) {
        return true
      } else {
        return false
      }
    }
  }

  const [
    { title, description, finishDate, status, priority, worker },
    setForm,
  ] = useState({
    title: '',
    description: '',
    finishDate: '',
    status: '',
    priority: '',
    worker: '',
  })

  useEffect(() => {
    if (id) {
      const index = mainStore.todo.findIndex((item) => item.id === id)

      console.log({...mainStore.todo})

      setForm(() => ({
        title: mainStore.todo[index]?.title,
        description: mainStore.todo[index]?.description,
        finishDate: mainStore.todo[index]?.finishDate,
        status: mainStore.todo[index]?.status,
        priority: mainStore.todo[index]?.priority,
        worker: mainStore.todo[index]?.worker,
      }))
    }
  }, [id, mainStore.todo])

  const onSubmit = useCallback(async () => {
    if (id) {
      await mainRest.updateTodo({
        id,
        title,
        description,
        finishDate,
        priority,
        status,
        worker,
      })
    } else {
      const creator = authStore.user?.email

      await mainRest.createTodo({
        title,
        description,
        finishDate,
        priority,
        status,
        worker,
        creator,
      })
    }
    onClick()
  }, [authStore.user?.email, description, finishDate, id, mainRest, onClick, priority, status, title, worker])

  const handleChange = useCallback(({ target: { value, name } }) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }, [])

  const onCloseModal = useCallback(() => {
    setForm(() => ({
      title: '',
      description: '',
      finishDate: '',
      status: '',
      priority: '',
      worker: '',
    }))

    onClick()
  }, [onClick])

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
