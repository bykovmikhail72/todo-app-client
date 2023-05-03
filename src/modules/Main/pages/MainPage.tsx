import { useEffect } from 'react'
import { useMainStore } from '../store/MainStore'
import TodoItem from '../components/TodoItem'
import { observer } from 'mobx-react-lite'

import styles from './MainPage.module.scss'
import { Typography } from 'ui/Typography'
import Button from 'ui/Button/Button'
import { useAuthStore } from 'modules/Auth/store/AuthStore'
import Modal from '../components/Modal/Modal'

import cn from 'classnames'
import useMainPage from '../hooks/useMainPage'

const MainPage = () => {
  const mainStore = useMainStore()
  const authStore = useAuthStore()

  const {
    id,
    todo,
    filter,
    handleExit,
    onShowModal,
    onHideModal,
    filteredTodo,
    isShowModal,
    setFilter,
  } = useMainPage()

  const modalClassNames = cn(isShowModal && styles.isShow, styles.modal)

  useEffect(() => {
    mainStore.getTodo()
    authStore.getOneUser(authStore.user.id)
  }, [authStore, id, mainStore])

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
            onClick={() => filteredTodo('На сегодня')}
            title="На сегодня"
          />
          <Button onClick={() => filteredTodo('На неделю')} title="На неделю" />
          <Button
            onClick={() => filteredTodo('На будущее')}
            title="На будущее"
          />
          {authStore.user?.role === 'MANAGER' && (
            <Button
              title="По исполнителям"
              onClick={() => filteredTodo('По исполнителю')}
            />
          )}
          <Button onClick={() => setFilter(false)} title="Без фильтра" />
        </div>
        {(filter ? todo : mainStore.todo)?.map((item) => {
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
        })}
      </div>
    </div>
  )
}

export default observer(MainPage)
