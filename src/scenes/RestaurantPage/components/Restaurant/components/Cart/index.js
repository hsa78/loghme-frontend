import React from 'react';
import './style.css';
import OrderItem from '../OrderItem/index';
import PersianNumber from '../../../../../../util/util';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../../../../../components/Spinner';

function Cart(props){
    const [reload, setReload] = React.useState(false);
    const [orders, setOrders] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [restaurantId, setRestaurantId] = React.useState('1234');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(()=> {
        setIsLoading(true);
        fetch('http://185.166.105.6:30005/CA7_backend/user/cart', { 
            method: 'GET', 
            headers: new Headers({
            'Authorization': window.localStorage.getItem('jwtToken') || ''
            })
        })
		  .then(resp => {
                if (resp.ok)
                  return resp.json();
                else
                  return "{}";
              }
          )
          .then(data => {
              setOrders(data.orders);
              setTotalPrice(data.totalPrice);
              setRestaurantId(data.restaurantId);
              setReload(false);
              setIsLoading(false);
          })
          .catch(error => {
              setIsLoading(false);  
              toast.error('Failed to get cart info!', {});
          });
    }, [reload]);

    var items = orders.map((order) =>
        <OrderItem
            foodName={order.food.name}
            count={order.numOfFoods}
            price={order.orderPrice}
            restaurantId={restaurantId}
            isFoodParty={order.isFoodParty}
            cartReload={setReload}
            foodId={order.foodId}
        />
    );

    function handleFinalize(e){
        e.preventDefault();
        setIsLoading(true);
		const requestOptions = {
	        method: 'POST',
	        headers: { 
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': window.localStorage.getItem('jwtToken') || ''
	        }
	    };
        fetch('http://185.166.105.6:30005/CA7_backend/user/finalizeOrder', requestOptions)
        .then(resp => {
                if (resp.ok){
                    setIsLoading(false);
                    setReload(true);
                    toast.success('Your cart finalized successfully!', {});
                }
                else{
                    setIsLoading(false);
                    toast.error('Something went wrong\nCheck your credit and foodParty orders.', {});
                }
            }
        )
        .catch(error => {
            setIsLoading(false);
            toast.error('Failed to get access to server!\nTry again later', {});
        });
    }

    return(
        <Spinner show={isLoading}>
            <div id="cartInfo" className="cartInfo p-2">
                <div className="cartTitle p-1">
                    <b>سبد خرید</b>
                </div>
                <div id="orderList" className="orderList p-3">
                    {items}
                </div>
                <div id="totalPrice" className="totalPrice">
                    جمع کل:
                    <b><PersianNumber number = {totalPrice} /> تومان</b>
                </div>
                <button type="button" className="btn btn-primary btn-sm confirmBtn" onClick={e => handleFinalize(e)}>
                    تأیید نهایی
                </button>
            </div>
        </Spinner>
    );
}

export default Cart;
