import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import LoginPage from '../components/login/LoginPage'
import HomePage from '../components/home/HomePage'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditPage from '../components/edit/EditPage'
import BasketPage from '../components/basket/BasketPage'
import ToolbarComponent from '../components/toolbar/ToolbarComponent'
import ShoppingHistoryPage from '../components/shoppingHistory/ShoppingHistoryPage'

const AppRoutes = () => {
  // const myToken = useSelector(state => state.userStatus.userToken);

  // const [tokenExist, setTokenExist] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage?.getItem("myToken")?.length) {
      navigate("/")
    }
  }, [localStorage?.getItem("myToken"), navigate])




  return (
    <div className={location?.pathname === "/" ? "h-full" : ""}>
      {location?.pathname !== "/" && <ToolbarComponent />}
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Edit' element={<EditPage />} />
        <Route path='/MyBasket' element={<BasketPage />} />
        <Route path='/ShoppingHistory' element={<ShoppingHistoryPage />}/>
      </Routes>
    </div>
  )
}

export default AppRoutes