import React, { useEffect, useRef, useState } from 'react'
import ToolbarComponent from '../toolbar/ToolbarComponent'
import { Card } from 'primereact/card';
import "./EditPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import userService from '../../api/User';
import { Toast } from 'primereact/toast';
import { setUser } from '../../store/userSlice';
import { Dialog } from 'primereact/dialog';

const EditPage = () => {
  const [editUser, SetEditUser] = useState({ userId: "", userName: "", userEmail: "", password: "", rePassword: "" })
  const [visible, setVisible] = useState(false);
  const store = useSelector(state => state);
  const navigate = useNavigate();
  const toast = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    SetEditUser((prev) => ({
      ...prev,
      userId: localStorage?.getItem("myUserId")
    }))
  }, [])



  const handeInputsChanges = (val, type) => {
    SetEditUser((prev) => ({
      ...prev,
      [type]: val
    }))
  }

  const sendToEdit = async () => {
    try {
      if (editUser?.password !== editUser?.rePassword) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: "paswords are does not match", life: 3000 });
        return;
      }
      const response = await userService.updateUser(editUser?.userId, editUser);
      if (response?.status === 200) {
        toast.current.show({ severity: 'success', summary: 'Updated', detail: "updated successfully", life: 3000 });
        localStorage.setItem("username", response?.data?.userName);
        localStorage.setItem("myUserId", response?.data?.userId);
        dispatch(setUser(response?.data?.userName));
        navigate("/Home");
      }
      console.log(response)
    } catch (error) {
      console.log(error?.message)
    }
  }

  const deleteUser = async () => {
    try {
      const response = await userService.deleteUser(editUser?.userId);
      if (response?.status === 204) {
        localStorage.removeItem("username");
        localStorage.removeItem("myUserId");
        localStorage.removeItem("myToken");
        toast.current.show({ severity: 'success', summary: 'Deleted', detail: "Deleted successfully", life: 3000 });
        await navigate("/")
      }
    } catch (error) {
      console.log(error?.message);
    }
  }


  const header = (
    <div className='flex align-items-center justify-content-between'>
      <h3>{store?.userStatus?.user}</h3>
      <Button label="Delete" severity="danger" onClick={() => setVisible(true)} icon="pi pi-trash" size="small" style={{ marginLeft: '0.5em' }} />
    </div>
  )

  const footer = (
    <>
      <Button label="Save" icon="pi pi-check" onClick={sendToEdit} />
      <Button label="Cancel" severity="secondary" onClick={() => navigate("/Home")} icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
    </>
  );

  const footerContent = (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" onClick={deleteUser} autoFocus />
    </div>
  );

  return (
    <div className="edit-component">
      <ToolbarComponent />
      <Toast ref={toast} />
      <Dialog header="Header" visible={visible} style={{ width: '20vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent}>
        <p className="m-0">
          Are you sure you want to delete your account? You cannot undo the changes you have made.
        </p>
      </Dialog>
      <div className="card card-element">
        <Card title={header} className="edit-card" footer={footer} >
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText placeholder="Username" onChange={(e) => handeInputsChanges(e.target.value, "userName")} />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-at"></i>
            </span>
            <InputText placeholder="Email" onChange={(e) => handeInputsChanges(e.target.value, "userEmail")} />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon"><i className="pi pi-key"></i></span>
            <InputText placeholder="Password" onChange={(e) => handeInputsChanges(e.target.value, "password")} />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon"> <i className="pi pi-key"></i></span>
            <InputText placeholder="Re-password" onChange={(e) => handeInputsChanges(e.target.value, "rePassword")} />
          </div>
        </Card>
      </div>

    </div>
  )
}

export default EditPage