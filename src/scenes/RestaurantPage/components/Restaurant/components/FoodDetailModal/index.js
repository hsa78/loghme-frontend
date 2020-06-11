import React from 'react'
import ReactDOM from 'react-dom';
import Cart from '../Cart/index';
import Modal from 'react-bootstrap/Modal';
import star from '../../images/star.png';
import  './style.css';
import PropTypes from 'prop-types';
import PersianNumber from '../../../../../../util/util';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FoodDetailModal(props){
    
    const [numOfFood, setNumOfFood] = React.useState(0)

    function handleIncreaseCount(e){
        e.preventDefault();
        if(props.isFoodParty){
            if(numOfFood < props.count)
                setNumOfFood(numOfFood + 1);
            else
                toast.warn('This food has limited count', {});
        }
        else
            setNumOfFood(numOfFood + 1);
    }

    function handleDecreaseCount(e){
        e.preventDefault();
        if(numOfFood > 0)
            setNumOfFood(numOfFood - 1);
        else
            toast.warn('Sorry :)', {});
    }

    function handleAddToCart(e){
        e.preventDefault();
        if(numOfFood < 1){
            toast.error('Please enter count of your order', {});
            return;
        }
        var params = {
		    "foodId": props.foodId,
		    "count" : numOfFood
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
                if (resp.ok){
                    toast.success('You ordered successfully!', {});
                    ReactDOM.render(<Cart/>, document.getElementById('cartBox'));
                }
                else
                    toast.error('Something went wrong!\nMaybe data is wrong or you have ordered from a different restaurant before!', {});
            }
        )
        .catch(error => {
            // toast.error('Failed to get access to server!\nTry again later', {});
        });
        props.onHide();
    }

    return(
        <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body className='food-detail-modal-body' closeButton>
                <div className="modalTitle">{props.restaurantName}</div>
                <div className="styled-box food-box">
                    <div className="food-info">
                        <img className="food-img" src={props.image} alt="food"/>
                        <div>
                            <div className="name-rate-box">
                                <p className="food-name">{props.foodName}</p>
                                <div className="food-rate">
                                    <p className="modal-rate"><PersianNumber number = {props.popularity} /></p>
                                    <img className="star-img" src={star} alt="star"/>
                                </div>
                            </div>
                            <div className="foodDescription">{props.description}</div>
                            {props.isFoodParty?
                                <div className="priceContainer">
                                    <div className="oldPrice"><PersianNumber number = {props.oldPrice} /></div>
                                    <div className="newPrice">
                                        <PersianNumber number = {props.price} />
                                        تومان
                                    </div>
                                </div>
                                :
                                <div className="foodPrice"><PersianNumber number = {props.price} />تومان</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="addToCart row">
                    {props.isFoodParty?
                        <div className="col-lg-2 countBox">
                            موجودی
                            :
                            <PersianNumber number = {props.count} />
                        </div>
                        :
                        <div className="col-lg-2"></div>
                    }
                    <div className="orderCountContainer col-lg-6">
                        <div className="glyph-icon flaticon-minus modal-minus-icon float-left" onClick={e => handleDecreaseCount(e)}>
                        </div>
                        <div className="orderCount float-left">
                            <PersianNumber number = {numOfFood} />
                        </div>
                        <div className="glyph-icon flaticon-plus modal-plus-icon float-left" onClick={e => handleIncreaseCount(e)}>
                        </div>
                    </div>
                    <button type="button" className="col-lg-4 btn btn-primary btn-sm confirmBtn" onClick={e => handleAddToCart(e)}>
                        اضافه کردن به سبد خرید
                    </button>
                </div>
            </Modal.Body>   
        </Modal>
    );
}

FoodDetailModal.propTypes = {
    foodName: PropTypes.string,
    image: PropTypes.string,
    popularity: PropTypes.number,
    description: PropTypes.string,
    price: PropTypes.number,
    oldPrice: PropTypes.number,
    restaurantName: PropTypes.string,
    isFoodParty: PropTypes.bool,
    count: PropTypes.number,
    foodId: PropTypes.number,
};

FoodDetailModal.defaultProps = {
    foodName: '',
    image: '',
    popularity: 0,
    description: '',
    price: 0,
    oldPrice: 0,
    restaurantName: '',
    isFoodParty: false,
    count: 0,
    foodId: 0,
};

export default FoodDetailModal