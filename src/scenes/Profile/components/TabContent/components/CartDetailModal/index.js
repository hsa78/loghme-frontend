import React from 'react'
import Modal from 'react-bootstrap/Modal';
import styles from './style.css';
import PropTypes from 'prop-types';
import PersianNumber from '../../../../../../util/util';
import Spinner from '../../../../../../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CartDetailModal(props){
    const [restaurantName, setRestaurantName] = React.useState('رستوران');
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [orders, setOrders] = React.useState([]);
    const [showSpinner, setShowSpinner] = React.useState(false);
    React.useEffect(()=> {
        setShowSpinner(true);
        fetch('http://185.166.105.6:30005/CA7_backend/user/cartHistory/' + props.cartId,{ 
            method: 'GET', 
            headers: new Headers({
            'Authorization': window.localStorage.getItem('jwtToken') || ''
            })
        })
		  .then(resp => {
                if (resp.ok)
                  return resp.json();
                else{
                  toast.error('Something went wrong.\nCheck your cart id...', {});
                  return "{}";
                }
              }
          )
          .then(data => {
              setRestaurantName(data.restaurantName);
              setTotalPrice(data.totalPrice);
              setOrders(data.orders);
              setShowSpinner(false);
          })
          .catch(error => {
            toast.error('Failed to get this cart info!', {});
            setShowSpinner(false);
          });
    }, []);
    
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body closeButton>
                <Spinner show={showSpinner}>
                    <h3 className={styles.title}>{restaurantName}</h3>
                    <table className="table table-bordered text-align-center">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" style={{width:'10%'}}>ردیف</th>
                                <th scope="col" >نام غذا</th>
                                <th scope="col" style={{width:'16.66%'}}>تعداد</th>
                                <th scope="col" style={{width:'25%'}}>قیمت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) => (
                                    <tr>
                                    <td><PersianNumber number = {index + 1} /></td>
                                    <td>{order.food.name}</td>
                                    <td><PersianNumber number = {order.numOfFoods} /></td>
                                    <td><PersianNumber number = {order.orderPrice} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <p className='total-price'>جمع کل: <PersianNumber number = {totalPrice} /> تومان</p>
                </Spinner>
            </Modal.Body>   
        </Modal>
    );
}

CartDetailModal.propsTypes = {
    cartId: PropTypes.string
}

CartDetailModal.defaultProps = {
    cartId: ''
}

export default CartDetailModal