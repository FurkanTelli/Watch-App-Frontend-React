import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from '../components/login/LoginPage'
import HomePage from '../components/home/HomePage'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditPage from '../components/edit/EditPage'

const AppRoutes = () => {
  const myToken = useSelector(state => state.userStatus.userToken);

    const [tokenExist, setTokenExist] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      if(!localStorage?.getItem("myToken")?.length) {
          navigate("/")
      } 
    }, [localStorage?.getItem("myToken"), navigate])


  return (
    <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/Home' element={<HomePage/>} />
        <Route path='/Edit' element={<EditPage/>} />
    </Routes>
  )
}

export default AppRoutes