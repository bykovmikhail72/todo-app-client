import { useCallback, useState } from 'react'
import { IModalProps } from '../types'
import { useAuthStore } from 'modules/Auth/store/AuthStore'
import { useMainStore } from 'modules/Main/store/MainStore'
import { useMainRest } from 'modules/Main/services/MainRest'

const useModal = ({ onClick, id }: IModalProps) => {
  const authStore = useAuthStore()
  const mainStore = useMainStore()
  const mainRest = useMainRest()

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

  const setInitialData = () => {
    const index = mainStore.todo.findIndex((item) => item.id === id)

    setForm(() => ({
      title: mainStore.todo[index]?.title,
      description: mainStore.todo[index]?.description,
      finishDate: mainStore.todo[index]?.finishDate,
      status: mainStore.todo[index]?.status,
      priority: mainStore.todo[index]?.priority,
      worker: mainStore.todo[index]?.worker,
    }))
  }

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
    onCloseModal()
    onClick()
  }, [authStore.user?.email, description, finishDate, id, mainRest, onClick, onCloseModal, priority, status, title, worker])

  const handleChange = useCallback(({ target: { value, name } }) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }, [])

  return {
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
    isDisabled
  }
}

export default useModal
