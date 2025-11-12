import React, { useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import "./LoginPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, setUser, setUserToken } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import userService from '../../api/User';
import { Toast } from 'primereact/toast';


const LoginPage = () => {
  const [login, setLogin] = useState({ id: "", userName: "", password: "", email: "" })
  const [loading, setLoading] = useState(false);
  const store = useSelector(state => state.userStatus.isLogin)
  const tokenInStore = useSelector(state => state.userStatus.userToken)

  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleUserInput = (val, type) => {
    setLogin((prev) => ({
      ...prev,
      [type]: val
    }))
  }

  const submit = async () => {
    setLoading(true);
    try {
      const response = await userService.loginById(login);
      if (response.status === 200 || response.status === 201) {
        dispatch(setIsLogin(true))
        dispatch(setUser(login.userName))
        await localStorage.setItem("myToken", response?.data?.generateToken);
        dispatch(setUserToken(localStorage.getItem("myToken")))
        await navigate("/Home")
      }
    } catch (error) {
      setLoading(false);
      dispatch(setIsLogin(false))
      console.log(error);
      if(error?.response?.status === 401) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: error?.response?.data, life: 3000 });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: "Backend Connection Error", life: 3000 });
      }
    }

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
          <span className="p-inputgroup-addon"><i className="pi pi-key"></i></span>
          <Password value={login.password} placeholder='Password' onChange={(e) => handleUserInput(e.target.value, "password")} toggleMask />
        </div>
        <div className="card flex flex-wrap justify-content-center gap-3 mt-3">
          <Button label="Submit" severity='secondary' icon="pi pi-check" className='w-full' loading={loading} onClick={submit} />
        </div>
      </div>
      <Toast ref={toast} />

    </div>
  )
}

export default LoginPage;