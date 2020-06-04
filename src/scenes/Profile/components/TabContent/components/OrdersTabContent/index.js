import React from 'react'
import OrderItem from '../OrderItem'
import Spinner from '../../../../../../components/Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ordersDefault = [{restaurantName:'رستوران خامس', status:'DeliveryIsOnTheWay', id:'1'},
                       {restaurantName:'رستوران خامس', status:'SearchingForDelivery', id:'2'},
                       {restaurantName:'رستوران خامس', status:'Delivered', id:'3'},
                       {restaurantName:'رستوران خامس', status:'Delivered', id:'4'},
                       {restaurantName:'رستوران خامس', status:'Delivered', id:'5'},
                       {restaurantName:'رستوران خامس', status:'Delivered', id:'6'},
                       {restaurantName:'رستوران خامس', status:'Delivered', id:'7'},
                      ];

function OrdersTabContent(props){
    const [orders, setOrders] = React.useState([]);
    const [showSpinner, setShowSpinner] = React.useState(false);
    React.useEffect(()=> {
        setShowSpinner(true);
        fetch('http://localhost:8080/user/cartHistory',{ 
            method: 'GET', 
            headers: new Headers({
            'Authorization': window.localStorage.getItem('jwtToken') || ''
            })
        })
		  .then(resp => {
                if (resp.ok){
                    return resp.json();
                }
                else
                    return "{}"
              }
        )
        .then(data => {
            setOrders(data.items);
            setShowSpinner(false);
        })
        .catch(error => {
            setShowSpinner(false);
            toast.error('Failed to get cart history!', {});
        });
    }, []);

    
    return(
        <Spinner show={showSpinner}>
            <div style={{width: '100%'}}>
                {orders.map((order,index) =>
                    <OrderItem 
                        num={index + 1}
                        restaurantName={order.restaurantName}
                        status={order.status}
                        key={order.id}
                        id={order.id}
                    />
                )}
            </div>
        </Spinner>
    );
}

export default OrdersTabContent