import React from 'react'
import FoodPartyItem from '../FoodPartyItem'
import styles from './style.module.css'
import PropTypes from 'prop-types'
import Spinner from '../../../../components/Spinner'


function FoodPartyMenu(props){
    return (

        <div className={styles['food-party-menu']}>
            {props.menu.map((food) => (
                <FoodPartyItem
                    foodImg={food.image}
                    foodName={food.name}
                    foodRate={food.popularity}
                    oldPrice={food.oldPrice}
                    newPrice={food.price}
                    remainingFoodNum={food.count}
                    description={food.description}
                    restaurantId={food.restaurantId}
                    foodId={food.id}
                    key={food.id}
                />
            ))}
        </div>
    );
}

FoodPartyMenu.propTypes = {
    menu: PropTypes.array
}

FoodPartyMenu.defaultProps = {
    menu: []
}

export default FoodPartyMenu