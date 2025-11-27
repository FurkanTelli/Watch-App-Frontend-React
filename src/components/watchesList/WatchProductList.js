import React, { useEffect, useState } from 'react'
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import productService from '../../api/Product';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useDispatch, useSelector } from 'react-redux';
import { setDidNewWatchAdd } from '../../store/userSlice';


const WatchProductList = () => {
    const [products, setProducts] = useState([]);
    const [editWatch, setEditWatch] = useState({ wathcId: "", watchname: "", watchbrand: "", price: 0, imgAdress: "" })
    const [visible, setVisible] = useState(false);
    const store = useSelector(state => state);
    const dispatch = useDispatch();


    const loadProducts = async () => {
        try {
            const data = await productService.getAllWatches();
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputsToEditNewWatch = (val, type) => {
        setEditWatch((prev) => ({
            ...prev,
            [type]: val
        }))
    }


    const submitEdit = async () => {
        try {
            const response = await productService.updateWatchById(editWatch.wathcId, editWatch)
            if (response.status === 200) {
                await loadProducts();
                setVisible(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteWatch = async () => {
        try {
            const response = await productService.deleteWatch(editWatch.wathcId);
            console.log(response)
            if (response?.status === 204) {
                setVisible(false);
                await loadProducts();
            }

        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        loadProducts();
        dispatch(setDidNewWatchAdd(false));
    },[store?.userStatus?.didTheNewWatchAdd])

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-roun shadow-4 border-radius border-round-md" src={`${product.img}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.watchName} | {product.watchBrand}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded"></Button>
                            <Button icon="pi pi-pencil" className="p-button-rounded" onClick={() => {
                                setVisible(true);
                                setEditWatch({
                                    wathcId: product.id,
                                    watchbrand: product.watchBrand,
                                    watchname: product.watchName,
                                    price: product.price,
                                    imgAdress: product.img
                                });
                            }}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };



    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">

            <Dialog header="New Watch" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">Watch Name:</label>
                        <InputText id="username" aria-describedby="username-help" value={editWatch.watchname} onChange={(e) => handleInputsToEditNewWatch(e.target.value, "watchname")} />
                    </div>
                    <div className="flex flex-column gap-2 mt-2">
                        <label htmlFor="username">Watch Brand:</label>
                        <InputText id="username" aria-describedby="username-help" value={editWatch.watchbrand} onChange={(e) => handleInputsToEditNewWatch(e.target.value, "watchbrand")} />
                    </div>
                    <div className="flex-auto">
                        <label htmlFor="integeronly" className="font-bold block mb-2">Price</label>
                        <InputNumber inputId="integeronly" value={editWatch.price} onValueChange={(e) => handleInputsToEditNewWatch(e.value, "price")} />
                    </div>
                    <div className="flex flex-column gap-2 mt-2">
                        <label htmlFor="username">Watch Img Adress:</label>
                        <InputText id="username" aria-describedby="username-help" value={editWatch.imgAdress} onChange={(e) => handleInputsToEditNewWatch(e.target.value, "imgAdress")} />
                    </div>
                    <div className='flex justify-content-end mt-2'>
                        <Button icon="pi pi-trash" severity='danger' className='mr-1' onClick={deleteWatch} />
                        <Button icon="pi pi-check" onClick={submitEdit} />
                    </div>
                </div>
            </Dialog>
            <DataView value={products} listTemplate={listTemplate} />
        </div>

    )
}

export default WatchProductList;