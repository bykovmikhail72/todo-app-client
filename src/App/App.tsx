import { Route, Routes } from 'react-router-dom'
import Auth from '../modules/Auth/Pages/Auth'
import { useAuthStore } from 'modules/Auth/store/AuthStore'
import MainPage from 'modules/Main/pages/MainPage'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

function App() {
  const authStore = useAuthStore()

  useEffect(() => {
    authStore.check()
  }, [authStore])

  if (authStore.isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    )
  }
}

export default observer(App)
