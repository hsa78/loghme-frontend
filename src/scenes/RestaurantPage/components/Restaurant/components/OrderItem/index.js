import React from 'react';
import PropTypes from 'prop-types';
import PersianNumber from '../../../../../../util/util';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderItem(props){
    function handleIncreaseOrderCount(e){
        e.preventDefault();
    	var params = {
		    "foodId": props.foodId,
		    "count" : 1
        };
		var queryString = Object.keys(params).map(function(key) {
    		return key + '=' + params[key]
        }).join('&');
		const requestOptions = {
	        method: 'POST',
	        headers: { 
	        	'content-length' : queryString.length,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': window.localStorage.getItem('jwtToken') || ''
	        },
	        body: queryString
        };
	    
        fetch('http://185.166.105.6:30005/CA7_backend/user/cart', requestOptions)
        .then(resp => {
                if (resp.ok)
                    ;
                else
                    toast.error('Something went wrong!\nCheck your request data and be patient...' + props.foodId, {});
            }
        )
        .catch(error => {
            toast.error('Failed to get access to server!\nTry again later', {});
        });
        
        props.cartReload(true);
    }

    function handleDecreaseOrderCount(e){
        e.preventDefault();
    	var params = {
            "foodId": props.foodId
        };
		var queryString = Object.keys(params).map(function(key) {
    		return key + '=' + params[key]
        }).join('&');
		const requestOptions = {
	        method: 'POST',
	        headers: { 
	        	'content-length' : queryString.length,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': window.localStorage.getItem('jwtToken') || ''
	        },
	        body: queryString
        };
        fetch('http://185.166.105.6:30005/CA7_backend/user/deleteFromCart', requestOptions)
        .then(resp => {
                if (resp.ok)
                ;
                else
                    toast.error('Something went wrong!\nCheck your request data and be patient...', {});
            }
        )
        .catch(error => {
            toast.error('Failed to get access to server!\nTry again later', {});
        });
        props.cartReload(true);
    }

    return(
        <div class="item">
            <div class="orderInfo">
                <div class="orderFoodName float-right">
                    {props.foodName}
                </div>
                <div class="glyph-icon flaticon-minus minus-icon float-left" onClick={e => handleDecreaseOrderCount(e)}>
                </div>
                <div class="orderCount float-left">
                    <PersianNumber number = {props.count} />
                </div>
                <div class="glyph-icon flaticon-plus plus-icon float-left" onClick={e => handleIncreaseOrderCount(e)}>
                </div>
            </div>
            <div class="orderPrice float-left">
                <p class="float-left">تومان</p>
                <p class="ml-1 float-right"><PersianNumber number = {props.price} /></p>
            </div>
        </div>
    );
}

export default OrderItem;

OrderItem.propTypes = {
    foodName : PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
    restauratntId:PropTypes.string,
    isFoodParty:PropTypes.bool,
    foodId: PropTypes.number,
};

OrderItem.defaultProps = {
    foodName: 'غذا',
    count: 1,
    price: 0,
    restauratntId: '1234',
    isFoodParty:false,
    foodId: 0,
};