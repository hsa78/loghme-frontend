import React from 'react'
import UnderLinedTitle from '../UnderLinedTitle'
import styles from './style.module.css'
import RestaurantMenu from '../RestaurantMenu'

function RestaurantMenuContainer(props){
    return (
        <div className={styles["restaurants-menu-container"]}>
            <UnderLinedTitle text="رستوران‌ها" />
            <RestaurantMenu showSpinner={props.showSpinner} restaurants={props.restaurants}/>
        </div>
    );
}

export default RestaurantMenuContainer