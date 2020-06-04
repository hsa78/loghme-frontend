import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Footer from './components/Footer/index'
import Header from './components/Header/index'
import Sign from './scenes/Sign/index'
import Profile from './scenes/Profile'
import Home from './scenes/Home'
import RestaurantPage from './scenes/RestaurantPage/index'
import { ToastContainer, toast } from 'react-toastify';
import './icons/font/flaticon.css';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  render() {
    return (
      <Router >
        <div className="App">
          <Switch>
            <Route exact path="/">
              <PrivateRoute goToLogin={true}>
                <Header home={false} />
                <Home />
              </PrivateRoute>
            </Route>
            <Route path="/signup">
              <PrivateRoute goToLogin={false}>
                <Sign type="signup" />
              </PrivateRoute>
            </Route>
            <Route path="/login">
              <PrivateRoute goToLogin={false}>
                <Sign type="login" />

              </PrivateRoute>
            </Route>
            <Route path="/profile">
              <PrivateRoute goToLogin={true}>
                <Header account={false}/>
                <Profile />
              </PrivateRoute>
            </Route>
            <Route path="/restaurant/:id" component={
              
                RestaurantPage
              
            }>
            </Route>
          </Switch>
          <Footer />

        </div>
        <ToastContainer />
      </Router>

    );
  }
}

export default App;
