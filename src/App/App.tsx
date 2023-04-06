import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../modules/Auth/Pages/Auth'
import { useAuthStore } from 'modules/Auth/store/AuthStore'
import MainPage from 'modules/Main/pages/MainPage'
import { observer } from 'mobx-react-lite'

function App() {
  const authStore = useAuthStore()

  useEffect(() => {
    authStore.check()
  }, [authStore])

  return (
    <Routes>
      <Route path="/" element={authStore.isAuthenticated ? <MainPage /> : <Auth />} />
    </Routes>
  )
}

export default observer(App)
