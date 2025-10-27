import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import "./LoginPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, setUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [login, setLogin] = useState({ id: "", userName: "", password: "", email: "" })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const store = useSelector(state => state.userStatus.isLogin)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserInput = (val, type) => {
    setLogin((prev) => ({
      ...prev,
      [type]: val
    }))
  }

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      if (login.userName === "admin" && login.email === "admin@gmail.com" && login.password === "admin2627") {
        setLoading(false);
        dispatch(setIsLogin(true))
        dispatch(setUser(login.userName))
        console.log(login)
        console.log(store)
        navigate("/Home")

      } else {
        setLoading(false);
        dispatch(setIsLogin(false))
        console.log(store)
      }
    }, 2000);
  }

  return (
    <div className='flex h-full justify-content-center align-items-center '>
      <div className="card flex-column gap-5 py-4 px-3 border-1 border-round-sm shadow-4">
        <div className="p-inputgroup flex-1 ">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="Username" value={login.userName} onChange={(e) => handleUserInput(e.target.value, "userName")} />
        </div>

        <div className="p-inputgroup flex-1 my-4">
          <span className="p-inputgroup-addon"><i className="pi pi-envelope"></i></span>
          <InputText placeholder="Website" value={login.email} onChange={(e) => handleUserInput(e.target.value, "email")} />
        </div>

        <div className="card flex justify-content-center">
          <span className="p-inputgroup-addon">$</span>
          <Password value={login.password} onChange={(e) => handleUserInput(e.target.value, "password")} toggleMask />
        </div>
        <div className="card flex flex-wrap justify-content-center gap-3 mt-3">
          <Button label="Submit" severity='secondary' icon="pi pi-check" className='w-full' loading={loading} onClick={submit} />
        </div>
      </div>


    </div>
  )
}

export default LoginPage;