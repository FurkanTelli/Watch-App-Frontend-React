import React, { useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import "./LoginPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { setId, setIsLogin, setUser, setUserToken } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import userService from '../../api/User';
import { Toast } from 'primereact/toast';


const LoginPage = () => {
  const [isClickedToRegisterBtn, setIsClickedToRegisterBtn] = useState(false)
  const [login, setLogin] = useState({ id: "", userName: "", password: "", email: "" })
  const [register, setRegister] = useState({ userName: "", password: "", repeatPassword: "", email: "" })
  const [loading, setLoading] = useState(false);
  // const store = useSelector(state => state.userStatus.isLogin)
  // const tokenInStore = useSelector(state => state.userStatus.userToken)

  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleLoginInput = (val, type) => {
    setLogin((prev) => (
      {
        ...prev,
        [type]: val
      }
    )
    )
  }

  const handleRegisterInput = (val, type) => {
    setRegister((prev) => (
      {
        ...prev,
        [type]: val
      }
    )
    )
  }

  const submitLogin = async () => {
    setLoading(true);
    try {
      const response = await userService.loginById(login);
      if (response.status === 200 || response.status === 201) {
        dispatch(setIsLogin(true))
        dispatch(setId(response?.data?.user?.userId))
        dispatch(setUser(login.userName))
        localStorage.setItem("myToken", response?.data?.generateToken);
        localStorage.setItem("username",login.userName);
        localStorage.setItem("myUserId", response?.data?.user?.userId);
        dispatch(setUserToken(localStorage.getItem("myToken")))
        await navigate("/Home")
      }
    } catch (error) {
      setLoading(false);
      dispatch(setIsLogin(false))
      console.log(error);
      if (error?.response?.status === 401) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: error?.response?.data, life: 3000 });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: "Backend Connection Error", life: 3000 });
      }
    }

  }

  const submitRegister = async () => {
      setLoading(true);
      if(register.password !== register.repeatPassword) {
         toast.current.show({ severity: 'error', summary: 'Error', detail: "Passwords do not match.", life: 3000 });
         setLoading(false)
         return;
      }
      const objToSend = {userName : register.userName, email: register.email, password: register.password }
      try {
        const response = await userService.registerUser(objToSend);
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          setIsClickedToRegisterBtn(false);
        }
      } catch (error) {
        console.log(error)
      }
  }


  return (
    <div className='flex h-full justify-content-center align-items-center '>
      {!isClickedToRegisterBtn ?
        <div className="card flex-column gap-5 py-4 px-3 border-1 border-round-sm shadow-4">
          <div className="p-inputgroup flex-1 ">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText placeholder="Username" value={login.userName} onChange={(e) => handleLoginInput(e.target.value, "userName")} />
          </div>

          <div className="p-inputgroup flex-1 my-4">
            <span className="p-inputgroup-addon"><i className="pi pi-envelope"></i></span>
            <InputText placeholder="Website" value={login.email} onChange={(e) => handleLoginInput(e.target.value, "email")} />
          </div>

          <div className="card flex justify-content-center">
            <span className="p-inputgroup-addon"><i className="pi pi-key"></i></span>
            <Password value={login.password} placeholder='Password' onChange={(e) => handleLoginInput(e.target.value, "password")} toggleMask />
          </div>
          <div className="card flex flex-wrap justify-content-center gap-3 mt-3">
            <Button label="Submit" severity='secondary' icon="pi pi-check" className='w-full' loading={loading} onClick={submitLogin} />
            <Button label="Register" icon="pi pi-user" className='w-full' severity="secondary" onClick={() => {
              setIsClickedToRegisterBtn(true)
              return setLogin({ userName: "", password: "", email: "" })
            }}
              text raised />
          </div>
        </div>
        : <div className="card flex-column gap-5 py-4 px-3 border-1 border-round-sm shadow-4">
          <div className="p-inputgroup flex-1 ">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText placeholder="Username" value={register.userName} onChange={(e) => handleRegisterInput(e.target.value, "userName")} />
          </div>

          <div className="p-inputgroup flex-1 my-4">
            <span className="p-inputgroup-addon"><i className="pi pi-envelope"></i></span>
            <InputText placeholder="Website" value={register.email} onChange={(e) => handleRegisterInput(e.target.value, "email")} />
          </div>

          <div className="card flex justify-content-center">
            <span className="p-inputgroup-addon"><i className="pi pi-key"></i></span>
            <Password value={register.password} placeholder='Password' onChange={(e) => handleRegisterInput(e.target.value, "password")} toggleMask />
          </div>
          <div className="card flex justify-content-center my-4">
            <span className="p-inputgroup-addon"><i className="pi pi-lock"></i></span>
            <Password value={register.repeatPassword} placeholder='Verify Password' onChange={(e) => handleRegisterInput(e.target.value, "repeatPassword")} toggleMask />
          </div>
          <div className="card flex flex-wrap justify-content-center gap-3 mt-3">
            <Button label="Register" severity='secondary' icon="pi pi-check" className='w-full' loading={loading} onClick={submitRegister} />
            <Button label="Back" icon="pi pi-arrow-left" className='w-full' severity="secondary" onClick={() => {
              setIsClickedToRegisterBtn(false)
              return setRegister({ userName: "", password: "", email: "", repeatPassword: "" })
            }} text raised />
          </div>
        </div>}
      <Toast ref={toast} />

    </div>
  )
}

export default LoginPage;