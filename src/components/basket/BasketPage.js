import React, { useEffect, useRef, useState } from 'react'
import "./BasketPage.css";
import ToolbarComponent from '../toolbar/ToolbarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { removeFromTheBasket, setEmptyTheArray, setTotalPaymentPrice } from '../../store/userSlice';
import { Tag } from 'primereact/tag';
import orderService from '../../api/Order';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';

const BasketPage = () => {
  const basket = useSelector(state => state?.userStatus?.myBaskets)
  const total = useSelector(state => state?.userStatus?.totalPaymentPrice);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);


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
    setLoading(true);
    try {
      const response = await orderService.sendOrders(basket);
      if (response?.status === 200 || response?.status === 201) {
        toast.current.show({ severity: 'success', summary: 'Successful', detail: "Your order has been received", life: 3000 });
        setLoading(false);
        dispatch(setEmptyTheArray())
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

   const accept = async() => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        await sendAllOrders()
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog group="declarative"  visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" 
    header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
          {basket.length ?
            <div>
              <DataView value={basket} listTemplate={listTemplate} />
              <hr />
              <div className='flex justify-content-between ml-3 mr-3'>
                <div>
                  <Tag value={`Total  |  ${total}`}></Tag>
                </div>
                <Button label="Apply" disabled={loading} loading={loading} severity="success" onClick={() => setVisible(true)} />
              </div>
            </div>
            : <div className='test'>
              <Tag icon="pi pi-exclamation-triangle" style={{ cursor: "pointer" }} severity="warning" value="There are no products in your cart"></Tag>
            </div>}
        </div>
  )
}

export default BasketPage