import React, { useEffect, useState } from 'react'
import "./ShoppingHistoryPage.css";
import { classNames } from 'primereact/utils';
import { DataView } from 'primereact/dataview';
import orderService from '../../api/Order';

const ShoppingHistoryPage = () => {
    const [shoppingHistory, setShoppingHistory] = useState([]);


    useEffect(() => {
        getAllMyShoppingHistory();
    }, [])

    const getAllMyShoppingHistory = async () => {
        try {
            const objToSend = { userId: localStorage.getItem("myUserId") };
            const response = await orderService.getAllShoppingHistory(objToSend);
            if(response?.status === 200 || response?.status === 201) {
                console.log(response.data)
                setShoppingHistory(response?.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.watchName} | {product.watchBrand} x {product.quantity}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product?.totalPrice)}</span>
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
        <div> <DataView value={shoppingHistory} listTemplate={listTemplate} /></div>
    )
}

export default ShoppingHistoryPage