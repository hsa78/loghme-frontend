import React from 'react';
import './style.css';
import defaultLogo from './images/rsz_restaurantlogo.png';
import defaultFoodPic from './images/pizza.jpg';
import PropTypes from 'prop-types';
import Cart from './components/Cart/index';
import FoodBox from './components/FoodBox/index';
import Spinner from '../../../../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Restaurant extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name : '', logo: '', menu: [], isLoading: false};
    }
    render(){
        const foods = this.state.menu;
        var foodBoxes = foods.map((food) =>
            <FoodBox
                name={food.name} 
                image={food.image} 
                price={food.price} 
                popularity={food.popularity} 
                available={food.available} 
                description={food.description} 
                restaurantId={this.props.id} 
                restaurantName={this.state.name}
                foodId={food.id}
            />
        );
        return(
            <div id ="holder" style={{flex: '1'}}>
                <Spinner show={this.state.isLoading}>
                    <div id="baner" className="baner container-fluid">
                        <img src={this.state.logo} className="restaurantLogo img-thumbnail" alt="Restaurant Logo"/>
                        <div className="restaurantName">
                            {this.state.name}
                        </div>   
                    </div>
                </Spinner>
                <div id="info" className="info row justify-content-around p-3">
                    <div id="cartBox" className="cartContainer col-lg-3 col-md-3">
                        <Cart />
                    </div>
                    <div id="menuContainer" className="col-lg-8 col-md-8 menuContainer">
                        <div id="menuTitle" className="menuTitle p-1">
                            <b>منوی غذا</b>
                        </div>
                        <Spinner show={this.state.isLoading}>
                            <div className="foodRow row">
                                {foodBoxes}
                            </div>
                        </Spinner>
                    </div>
                </div>
            </div>
        );
    }

    fetchRestaurantData() {
        fetch('http://localhost:8080/restaurant/detail/' + this.props.id, { 
            method: 'GET', 
            headers: new Headers({
            'Authorization': window.localStorage.getItem('jwtToken') || ''
            })
        })
		  .then(resp => {
                if (resp.ok)
                  return resp.json();
                else{
                  toast.error('Something went wrong!\nCheck restaurant id but maybe you don\'t have access...', {});  
                  return "{}";
                }
              }
          )
          .then(data => this.setState(prevState => ({ name : data.name, logo: data.logo, menu: data.menu, isLoading: false })))
          .catch(error => {
            this.setState(prevState => ({isLoading: false}));
            toast.error('Failed to get restaurant info!', {});
          });
    }
    componentDidMount() {
        this.setState(prevState => ({ isLoading: true }));
        this.fetchRestaurantData();
    }

}

Restaurant.propTypes = {
    id : PropTypes.string
};

Restaurant.defaultProps = {
    id : "1234"
};

export default Restaurant;