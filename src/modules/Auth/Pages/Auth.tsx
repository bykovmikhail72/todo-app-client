import { useState, useCallback } from 'react'
import Button from '../../../ui/Button/Button'
import Input from '../../../ui/Input/Input'
import { Typography } from '../../../ui/Typography'

import styles from './Auth.module.scss'
import { useAuthStore } from '../store/AuthStore'
import { observer } from 'mobx-react-lite'

const Auth = () => {
  const authStore = useAuthStore()

  const [{email, password}, setForm] = useState({email: '', password: ''})

  const handleChange = useCallback(({target: {name, value}}) => {
    setForm((prevForm) => ({...prevForm, [name]: value}))
  }, [])

  const handleSubmit = useCallback(async () =>  {
    await authStore.handleSubmit({ email, password })
  }, [authStore, email, password])

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
          name='email'
          label="Логин"
          value={email}
          onChange={handleChange}
        />
        <Input
          labelSize={18}
          name='password'
          type={'password'}
          size={18}
          label="Пароль"
          value={password}
          onChange={handleChange}
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
