import { Button } from 'primereact/button';
import ToolbarComponent from '../toolbar/ToolbarComponent';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import productService from '../../api/Product';
import WatchProductList from '../watchesList/WatchProductList';

const HomePage = () => {

    const [visible, setVisible] = useState(false);
    const [newWatch, setNewWatch] = useState({watchId: "", watchname: "", watchbrand: "", price: 0, imgAdress: "" });

    const handleInputsToAddNewWatch = (val, type) => {
        setNewWatch((prev) => ({
            ...prev,
            [type]: val
        }))
    }

     const loadProducts = async () => {
        try {
            const data = await productService.getAllWatches();
        } catch (error) {
            console.log(error)
        }
    }

    const createNewWatch = async () => {
        try {
            const response = await productService.addNewWatch(newWatch);
            if(response.status === 200 || response.status === 201) {
                await loadProducts();
                await setVisible(false);
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="card">
            <ToolbarComponent />

            <div className='m-4'>
                <div className='mb-2 flex justify-content-end'>
                    <Button label="Add" icon="pi pi-plus" onClick={() => setVisible(true)} />
                </div>
                <Dialog header="New Watch" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                    <div>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="username">Watch Name:</label>
                            <InputText id="username" aria-describedby="username-help" value={newWatch.watchname} onChange={(e) => handleInputsToAddNewWatch(e.target.value, "watchname")} />
                        </div>
                        <div className="flex flex-column gap-2 mt-2">
                            <label htmlFor="username">Watch Brand:</label>
                            <InputText id="username" aria-describedby="username-help" value={newWatch.watchbrand} onChange={(e) => handleInputsToAddNewWatch(e.target.value, "watchbrand")} />
                        </div>
                        <div className="flex-auto">
                            <label htmlFor="integeronly" className="font-bold block mb-2">Price</label>
                            <InputNumber inputId="integeronly" value={newWatch.price} onValueChange={(e) => handleInputsToAddNewWatch(e.value, "price")} />
                        </div>
                        <div className="flex flex-column gap-2 mt-2">
                            <label htmlFor="username">Watch Img Adress:</label>
                            <InputText id="username" aria-describedby="username-help" value={newWatch.imgAdress} onChange={(e) => handleInputsToAddNewWatch(e.target.value, "imgAdress")} />
                        </div>
                        <div className='flex justify-content-end mt-2'>
                            <Button icon="pi pi-check" onClick={createNewWatch} />
                        </div>
                    </div>
                </Dialog>


                <div className='border-2 border-round-sm shadow-4'>
                    <WatchProductList />
                </div>
            </div>
        </div>
    )
}

export default HomePage