import { useCallback, useState } from 'react'
import { useMainStore } from '../store/MainStore'
import { useAuthStore } from 'modules/Auth/store/AuthStore'

const useMainPage = () => {
  const mainStore = useMainStore()
  const authStore = useAuthStore()

  const [isShowModal, setIsShowModal] = useState(false)
  const [id, setId] = useState(undefined)
  const [todo, setTodo] = useState(mainStore.todo)
  const [filter, setFilter] = useState(false)

  const handleExit = useCallback(() => {
    authStore.logout()
  }, [authStore])

  const onShowModal = useCallback(
    (id?: number) => {
      setIsShowModal(!isShowModal)
      typeof id === 'number' && setId(id)
    },
    [isShowModal],
  )

  const onHideModal = useCallback(() => {
    setId(undefined)
    setIsShowModal(false)
  }, [])

  const filteredTodo = (option?: string) => {
    setFilter(true)

    const filteredArr = mainStore.todo?.filter(
      (item) => item.worker === authStore.user?.name,
    )

    switch (option) {
      case 'На сегодня':
        {
          const newArr = filteredArr?.filter(
            (item) => item.finishDate === new Date().toLocaleDateString(),
          )
          setTodo(newArr)
        }
        break
      case 'На неделю':
        {
          const nextWeekTime = new Date(
            new Date().getTime() + 604800000,
          ).toLocaleDateString()
          const newArr = filteredArr?.filter(
            (item) => item.finishDate <= nextWeekTime,
          )
          setTodo(newArr)
        }
        break
      case 'На будущее':
        setTodo(filteredArr)
        break
      case 'По исполнителю':
        {
          const copyTodo = [...mainStore.todo].sort((a, b) =>
            a?.worker?.localeCompare(b?.worker),
          )
          setTodo(copyTodo)
        }
        break
    }
  }

  return {
    id,
    todo,
    filter,
    handleExit,
    onShowModal,
    onHideModal,
    filteredTodo,
    isShowModal,
    setFilter
  }
}

export default useMainPage
