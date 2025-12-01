import React, { useContext, useEffect } from 'react'
import { setIsLogin, setTheme, setUser, setUserToken } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { InputIcon } from 'primereact/inputicon';
import { Message } from 'primereact/message';
import { Toolbar } from 'primereact/toolbar';
import { PrimeReactContext } from 'primereact/api';
import userService from '../../api/User';
import { useNavigate } from 'react-router-dom';

const ToolbarComponent = () => {
    const user = useSelector(state => state.userStatus.user);
    const theme = useSelector(state => state.userStatus.darkTheme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { changeTheme } = useContext(PrimeReactContext);


    useEffect(() => {
        if(!user) {
            const saved = localStorage.getItem("username")
            dispatch(setUser(saved));
        }
    },[])



    const toggleTheme = () => {
        const current = theme ? "lara-dark-blue" : "lara-light-blue";
        const next = theme ? "lara-light-blue" : "lara-dark-blue";

        changeTheme(current, next, "theme-link", () => {
            console.log("Theme changed to:", next);
            dispatch(setTheme());
        });
    };

      const logOut = async  () => {
        try {
            const response = await userService.logout();
            dispatch(setIsLogin(false));
            dispatch(setUser(""));
            dispatch(setUserToken(""));
            localStorage.removeItem("myToken");
            localStorage.removeItem("username");
            localStorage.removeItem("myUserId");
            await navigate("/")
        } catch (error) {
          console.log(error)
        }
      }


    const startContent = (
        <React.Fragment>
            <Button icon="pi pi-home" onClick={() => navigate("/Home")} ></Button>
        </React.Fragment>
    );

    const centerContent = (
        <div className='flex align-items-center'>
            <InputIcon className="pi pi-stopwatch" style={{ fontSize: '2rem' }} />
            <Message severity="contrast" text={user} />
        </div>
    );

    const endContent = (
        <React.Fragment>
            <Button icon={theme ? "pi pi-sun" : "pi pi-moon"} severity={theme ? "warning" : "secondary"} className="mr-2" onClick={toggleTheme} />
            <Button icon="pi pi-user-edit" severity='success' onClick={() => navigate("/Edit")} className="mr-2" />
            <Button icon="pi pi-shopping-cart" severity='help' onClick={() => navigate("/MyBasket")} className='mr-2' />
            <Button icon="pi pi-sign-out" onClick={logOut} severity='danger' />
        </React.Fragment >
    );

    return (
        <div className="card">
            <Toolbar start={startContent} center={centerContent} end={endContent} />
        </div>
    )
}

export default ToolbarComponent