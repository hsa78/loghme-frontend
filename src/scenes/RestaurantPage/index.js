import React from 'react';
import Header from '../../components/Header/index';
import Restaurant from './components/Restaurant/index';
import PrivateRoute from '../../components/PrivateRoute';

class RestaurantPage extends React.Component{

    render(){
        return(
            <PrivateRoute goToLogin={true}>
                <Header/>
                <Restaurant id={this.props.match.params.id}/>
            </PrivateRoute>
        );
    }

}

export default RestaurantPage;