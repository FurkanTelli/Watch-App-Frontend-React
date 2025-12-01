import React, { useEffect, useState } from 'react'
import "./BasketPage.css";
import ToolbarComponent from '../toolbar/ToolbarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { removeFromTheBasket, setTotalPaymentPrice } from '../../store/userSlice';
import { Tag } from 'primereact/tag';
import orderService from '../../api/Order';

const BasketPage = () => {
  const basket = useSelector(state => state?.userStatus?.myBaskets)
  const total = useSelector(state => state?.userStatus?.totalPaymentPrice);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setTotalPaymentPrice());
  }, [basket])


  const itemTemplate = (product, index) => {
    return (
      <div className="col-12" key={product.id}>
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-roun shadow-4 border-radius border-round-md" src={`${product.img}`} alt={product.name} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.watchName} | {product.watchBrand} x {product.quantity}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price * product.quantity)}</span>
              <Button icon="pi pi-trash" onClick={() => dispatch(removeFromTheBasket(product.id))} className="p-button-rounded"></Button>
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


  const sendAllOrders = async () => {
    try {
      const response = await orderService.sendOrders(basket);
      console.log(response)
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div>
      <ToolbarComponent />
      {basket.length ?
        <div>
          <DataView value={basket} listTemplate={listTemplate} />
          <hr />
          <div className='flex justify-content-between ml-3 mr-3'>
            <div>
              <Tag value={`Total  |  ${total}`}></Tag>
            </div>
            <Button label="Apply" severity="success" onClick={sendAllOrders} />
          </div>
        </div>
        : <div className='test'>
          <Tag  icon="pi pi-exclamation-triangle" style={{cursor:"pointer"}} severity="warning" value="There are no products in your cart"></Tag>
        </div>}
    </div>
  )
}

export default BasketPage