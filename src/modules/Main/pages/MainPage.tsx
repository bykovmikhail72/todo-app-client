import { useEffect, useState } from 'react'
import { useMainStore } from '../store/MainStore'
import TodoItem from '../components/TodoItem'
import { observer } from 'mobx-react-lite'

import styles from './MainPage.module.scss'
import { Typography } from 'ui/Typography'
import Button from 'ui/Button/Button'
import { useAuthStore } from 'modules/Auth/store/AuthStore'
import Modal from 'lib/components/Modal'

import cn from 'classnames'

const MainPage = () => {
  const mainStore = useMainStore()
  const authStore = useAuthStore()

  const [isShowModal, setIsShowModal] = useState(false)
  const [id, setId] = useState(undefined)
  const [todo, setTodo] = useState(mainStore.todo)
  const [filter, setFilter] = useState(false)

  const modalClassNames = cn(isShowModal && styles.isShow, styles.modal)

  useEffect(() => {
    mainStore.getTodo()
    authStore.getOneUser(authStore.user.id)
  }, [authStore, id, mainStore])

  const handleExit = () => {
    authStore.logout()
  }

  const onShowModal = (id?: number) => {
    setIsShowModal(!isShowModal)
    id && setId(id)
  }

  const onHideModal = () => {
    setId(undefined)
    setIsShowModal(false)
  }

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

  const renderContent = () => {
    if (filter) {
      return todo?.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            createDate={item.createdAt}
            creator={item.creator}
            finishDate={item.finishDate}
            priority={item.priority}
            status={item.status}
            updateDate={item.updatedAt}
            worker={item.worker}
            onClick={(id) => onShowModal(id)}
          />
        )
      })
    } else {
      return mainStore.todo?.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            createDate={item.createdAt}
            creator={item.creator}
            finishDate={item.finishDate}
            priority={item.priority}
            status={item.status}
            updateDate={item.updatedAt}
            worker={item.worker}
            onClick={(id) => onShowModal(id)}
          />
        )
      })
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography
          size={18}
          weight="medium">{`Вы вошли как ${authStore.user.surname} ${authStore.user.name} ${authStore.user.lastname}`}</Typography>
        <Button onClick={handleExit} size="small" title="Выйти" />
      </div>
      <Modal id={id} onClick={onHideModal} className={modalClassNames} />
      <div className={styles.container}>
        <Button onClick={onShowModal} title="+ Новая задача" size="small" />
        <div className={styles.filter}>
          <Typography size={16}>Варианты отображения:</Typography>
          <Button
            size="small"
            onClick={() => filteredTodo('На сегодня')}
            title="На сегодня"
          />
          <Button
            size="small"
            onClick={() => filteredTodo('На неделю')}
            title="На неделю"
          />
          <Button
            size="small"
            onClick={() => filteredTodo('На будущее')}
            title="На будущее"
          />
          {authStore.user?.role === 'MANAGER' && (
            <Button
              title="По исполнителям"
              size="small"
              onClick={() => filteredTodo('По исполнителю')}
            />
          )}
          <Button
            size="small"
            onClick={() => setFilter(false)}
            title="Без фильтра"
          />
        </div>
        {renderContent()}
      </div>
    </div>
  )
}

export default observer(MainPage)
