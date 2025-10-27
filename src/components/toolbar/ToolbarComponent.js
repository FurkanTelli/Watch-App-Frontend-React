import React, { useContext, useEffect } from 'react'
import { setTheme } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { InputIcon } from 'primereact/inputicon';
import { Message } from 'primereact/message';
import { Toolbar } from 'primereact/toolbar';
import { PrimeReactContext } from 'primereact/api';

const ToolbarComponent = () => {
    const user = useSelector(state => state.userStatus.user);
    const theme = useSelector(state => state.userStatus.darkTheme);
    const dispatch = useDispatch();
    const { changeTheme } = useContext(PrimeReactContext);



    const toggleTheme = () => {
        const current = theme ? "lara-dark-blue" : "lara-light-blue";
        const next = theme ? "lara-light-blue" : "lara-dark-blue";

        changeTheme(current, next, "theme-link", () => {
            console.log("Theme changed to:", next);
            dispatch(setTheme());
        });
    };

    const startContent = (
        <React.Fragment>
            <Button icon="pi pi-home"></Button>
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
            <Button icon="pi pi-user-edit" severity='success' className="mr-2" />
            <Button icon="pi pi-shopping-cart" severity='help' className='mr-2' />
            <Button icon="pi pi-sign-out" severity='danger' />
        </React.Fragment >
    );

    return (
        <div className="card">
            <Toolbar start={startContent} center={centerContent} end={endContent} />
        </div>
    )
}

export default ToolbarComponent