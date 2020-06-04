import React from 'react';
import styles from './style.module.css'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";

function RestaurantItem(props){
    let history = useHistory();
    return (
        <div className={`${styles["styled-box"]} ${styles["restaurant-box"]} ${styles["col-md-3"]}`}>
            <img className={styles["restaurant-logo"]} src={props.restaurantLogo} alt="restaurnat logo"/>
            <p className={styles["res-name"]}>{props.restaurantName}</p>
            <button 
                className={styles["view-menu-btn"]} 
                onClick={() => history.push('/restaurant/'+props.restaurantId)}
            >
                نمایش منو
            </button>
        </div>
    );
}

RestaurantItem.propTypes = {
    restaurantLogo: PropTypes.string,
    restaurantName: PropTypes.string,
    restaurantId: PropTypes.string,
}

RestaurantItem.defaultProps = {
    restaurantLogo: '',
    restaurantName: '',
    restaurantId: '',
}

export default RestaurantItem