import { useState, ChangeEvent } from 'react'
import Button from '../../../ui/Button/Button'
import Input from '../../../ui/Input/Input'
import { Typography } from '../../../ui/Typography'

import styles from './Auth.module.scss'
import { useAuthStore } from '../store/AuthStore'
import { observer } from 'mobx-react-lite'

const Auth = () => {
  const authStore = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onChangeLogin(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  async function handleSubmit() {
    await authStore.handleSubmit({ email, password })
  }

  return (
    <div className="authPage">
      <div className={styles.header}>
        <Typography size={24}>
          Приложение для учета деятельности сотрудников
        </Typography>
      </div>
      <div className={styles.auth}>
        <Typography size={32} weight="medium" className="title">
          Авторизация
        </Typography>
        <Input
          labelSize={18}
          label="Логин"
          value={email}
          onChange={onChangeLogin}
        />
        <Input
          labelSize={18}
          type={'password'}
          size={18}
          label="Пароль"
          value={password}
          onChange={onChangePassword}
        />
        <Button
          className={styles.button}
          onClick={handleSubmit}
          title="Войти"
        />
      </div>
    </div>
  )
}

export default observer(Auth)
