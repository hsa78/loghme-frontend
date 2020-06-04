import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'
import starImg from './images/star.png'
import FoodDetailModal from '../../../RestaurantPage/components/Restaurant/components/FoodDetailModal'
import PersianNumber from '../../../../util/util'
import Spinner from '../../../../components/Spinner/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function FoodPartyItem(props){
    const [modalShow, setModalShow] = React.useState(false);
    const [restaurantName, setRestaurantName] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(()=> {
        setIsLoading(true);
        fetch('http://localhost:8080/restaurant/brief/' + props.restaurantId, { 
            method: 'GET', 
            headers: new Headers({
            'Authorization': window.localStorage.getItem('jwtToken') || ''
            })
        })
		  .then(resp => {
                if (resp.ok)
                    return resp.json();
                else{
                    toast.error('Failed to get restaurant name!\nCheck its id again...', {});
                    return "{}";
                }
              }
          )
          .then(data => {
              setRestaurantName(data.name);
              setIsLoading(false);
          })
          .catch(error => {
            setIsLoading(false);
          });
    }, []);
    
    function getInventoryBoxCode(){
        if(props.remainingFoodNum === 0){
            return (<div className={`${styles["inventory-box"]} ${styles["empty"]}`}>
                        ناموجود
                    </div>);
        }
        else{
            return (
                <div className={styles["inventory-box"]}>
                    موجودی:
                    <p className={`${styles["remaining-food-number"]}`}><PersianNumber number = {props.remainingFoodNum} /> </p>
                </div>
            );
        }
    }

    return (
        <div className={styles["styled-box"]} id={props.restaurantId}>
            <div className={styles["food-info"]}>
                <img className={styles["food-img"]} src={props.foodImg} alt="food image"/>
                <div className={styles["name-rate-box"]}>
                    <p className={styles["food-name"]}>{props.foodName}</p>
                    <div className={styles["food-rate"]}>
                        <p className={`${styles["rate"]}`}><PersianNumber number = {props.foodRate} /></p>
                        <img className="star-img" src={starImg} alt="star"/>
                    </div>
                </div>
            </div>
            <div className={styles["price-info"]}>
                <div className={`${styles["old-price"]}`}><PersianNumber number = {props.oldPrice} /></div>
                <div><PersianNumber number = {props.newPrice} /></div>
            </div>
            <div className={styles["buy-box"]}>
                {getInventoryBoxCode()}
                <a className={styles["buying-button"]} onClick={()=> props.remainingFoodNum && setModalShow(true)}>خرید</a>
            </div>
            <Spinner show={isLoading} size='sm'>
                <p className={styles["restaurant-name"]}>
                    {restaurantName}
                </p>
            </Spinner>
            <FoodDetailModal 
                isFoodParty={true} 
                count={props.remainingFoodNum} 
                foodName={props.foodName}
                foodId={props.foodId}
                restaurantName={props.restaurantName}
                image={props.foodImg}
                popularity={props.foodRate}
                oldPrice={props.oldPrice}
                price={props.newPrice}
                description={props.description}
                onHide={() => setModalShow(false)}
                show={modalShow}
            />
        </div>
    );
}

FoodPartyItem.propTypes = {
    foodImg: PropTypes.string,
    foodName: PropTypes.string,
    foodRate: PropTypes.number,
    oldPrice: PropTypes.number,
    newPrice: PropTypes.number,
    remainingFoodNum: PropTypes.number ,
    restaurantId: PropTypes.string,
    foodId:PropTypes.number,
    description: PropTypes.string
}

FoodPartyItem.defaultProps = {
    foodImg: '',
    foodName: '',
    foodRate: 0,
    oldPrice: 0,
    newPrice: 0,
    remainingFoodNum: 0 ,
    restaurantId: '',
    description:'',
    foodId:0,
}

export default FoodPartyItem