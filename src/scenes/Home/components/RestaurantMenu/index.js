import React from 'react'
import logo from './images/restaurantLogo.png'
import RestaurantItem from '../RestaurantItem';
import styles from './style.module.css'
import Spinner from '../../../../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const restaurantMenuDefault = [{name: 'Khames Fried Chicken Khames Fried Chicken Khames Fried Chicken Khames Fried Chicken Khames Fried Chicken', logo:logo, id:'121'},
                               {name: 'Khames Fried Chicken', logo:logo, id:'122'},
                               {name: 'Khames Fried Chicken', logo:logo, id:'123'},
                               {name: 'Khames Fried Chicken', logo:logo, id:'124'},
                               {name: 'Khames Fried Chicken', logo:logo, id:'125'},
                               {name: 'Khames Fried Chicken', logo:logo, id:'126'},
                               {name: 'Khames Fried Chicken', logo:logo, id:'127'},
                               {name: 'Khames Fried Chicken', logo:logo, id:'128'},
                              ]

function RestaurantMenu(props){
    console.log(props.restaurants);
    return (
        <Spinner show={props.showSpinner}>
            <div className={`${styles["menu"]} row`}>
                { 
                (props.restaurants).map((restaurant) => (
                    <RestaurantItem
                        restaurantId={restaurant.id}
                        restaurantLogo={restaurant.logo}
                        restaurantName={restaurant.name}
                        key={restaurant.id}
                    />
                )) }
            </div>
        </Spinner>
    );
}

export default RestaurantMenu