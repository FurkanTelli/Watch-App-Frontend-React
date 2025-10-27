import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/login/LoginPage'
import HomePage from '../components/home/HomePage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/Home' element={<HomePage/>} />
    </Routes>
  )
}

export default AppRoutes