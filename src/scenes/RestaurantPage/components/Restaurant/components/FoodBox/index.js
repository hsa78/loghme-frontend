import React from 'react';
import star from '../../images/star.png';
import PropTypes from 'prop-types';
import FoodDetailModal from '../FoodDetailModal/index';
import defaultFoodPic from '../../images/pizza.jpg';
import PersianNumber from '../../../../../../util/util';
import styles from './style.module.css'

function FoodBox(props){
    const [modalShow, setModalShow] = React.useState(false);
    return(
        <div class={`${styles['styled-box']} col-lg-3`}>
            <img src={props.image} class={styles['food-img']} alt="food"/>
            <div class={styles['name-rate-box']}>
                <div class={styles['food-name']}>
                    <b>{props.name}</b>
                </div>
                <div class={styles['food-rate']}>
                    <p class={styles['rate']}><PersianNumber number = {props.popularity} /></p>    
                    <img src={star} class='star-img' alt="rate"/>
                </div>
            </div>
            <div className={styles['price']}>
                <PersianNumber number = {props.price}/> تومان
            </div>
            {props.available ?
                <React.Fragment>
                    <button type="button" class={styles['buying-button']} onClick={() => setModalShow(true)}> افزودن به سبد خرید</button>
                    <FoodDetailModal show={modalShow} onHide={() => setModalShow(false)}
                                    foodName={props.name}
                                    image={props.image}
                                    price={props.price}
                                    popularity={props.popularity}
                                    description={props.description}
                                    restaurantId={props.restaurantId}
                                    restaurantName={props.restaurantName}
                                    foodId={props.foodId}
                                    isFoodParty={false}/>
                </React.Fragment>
                : <button type="button" class={`${styles['buying-button']} ${styles['empty']}`}> ناموجود</button>              
            }
        </div>
    );
}

FoodBox.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string, 
    price: PropTypes.number,
    popularity: PropTypes.number,
    description: PropTypes.string,
    available: PropTypes.bool,
    restaurantId: PropTypes.string,
    restaurantName: PropTypes.string,
    foodId: PropTypes.number,
};

FoodBox.defaultProps = {
    name: 'غذا',
    image: defaultFoodPic,
    price: 0,
    popularity: 0,
    description: 'خوب',
    available: true,
    restaurantId: '1234',
    restaurantName: 'خامس',
    foodId:0,
};

export default FoodBox;