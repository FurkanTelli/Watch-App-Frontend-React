import React, { useContext, useEffect, useRef, useState } from 'react'
import "./ToolbarComponent.css"
import { setIsLogin, setTheme, setUser, setUserToken } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { InputIcon } from 'primereact/inputicon';
import { Message } from 'primereact/message';
import { Toolbar } from 'primereact/toolbar';
import { PrimeReactContext } from 'primereact/api';
import userService from '../../api/User';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

const ToolbarComponent = () => {
    const user = useSelector(state => state.userStatus.user);
    const basket = useSelector(state => state?.userStatus?.myBaskets)
    const theme = useSelector(state => state.userStatus.darkTheme);
    const [visibleRight, setVisibleRight] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { changeTheme } = useContext(PrimeReactContext);
    const toast = useRef(null);


    useEffect(() => {
        if (!user) {
            const saved = localStorage.getItem("username")
            dispatch(setUser(saved));
        }
    }, [])

    
    
    const confirmLogout = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to logout?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };
    
    const accept = async () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        await logOut()
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const toggleTheme = () => {
        const current = theme ? "lara-dark-blue" : "lara-light-blue";
        const next = theme ? "lara-light-blue" : "lara-dark-blue";

        changeTheme(current, next, "theme-link", () => {
            console.log("Theme changed to:", next);
            dispatch(setTheme());
        });
    };

    const logOut = async () => {
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
            <Button icon="pi pi-align-justify" className='mr-2' onClick={() => setVisibleRight(true)} />
            <Button icon="pi pi-sign-out" onClick={confirmLogout} severity='danger' />
        </React.Fragment >
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmPopup />
            <Toolbar start={startContent} center={centerContent} end={endContent} />
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <h2>Menu</h2>
                <div className='flex flex-column gap-3 justify-content-center align-items-center'>
                    <Button icon={theme ? "pi pi-sun" : "pi pi-moon"} label="Toggle Theme" severity={theme ? "warning" : "secondary"} onClick={toggleTheme} raised />
                    <Button icon="pi pi-user-edit" severity='success' label='Edit User' onClick={() => navigate("/Edit")} raised />
                    <Button icon="pi pi-shopping-cart" severity='help' label='Shopping Cart' onClick={() => navigate("/MyBasket")} raised >
                        {basket.length ? <Badge value={basket?.length} severity="danger"></Badge> : ""}
                    </Button>
                    <Button icon="pi pi-book" severity='info' label='Shopping History' onClick={() => navigate("/ShoppingHistory")} raised />
                </div>
            </Sidebar>
        </div>
    )
}

export default ToolbarComponent