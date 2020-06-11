import React from 'react';
import './style.css';
import logo from './images/LOGO.png'
import PropTypes from 'prop-types';
import CartModal from '../CartModal';
import PersianNumber from '../../util/util';
import { useHistory } from "react-router-dom";
import Spinner from '../Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const createHistory = require("history").createBrowserHistory;

function Header (props){
    
    const [numOfOrders, setNumOfOrders] = React.useState(0);
    const [showModal, setShowModal] = React.useState(false);
    const [showSpinner, setShowSpinner] = React.useState(false);
    let history = useHistory();

    function fetchCartBadge(){
        setShowSpinner(true);
        fetch('http://185.166.105.6:30005/CA7_backend/user/cartBadge', { 
                method: 'GET', 
                headers: new Headers({
                'Authorization': window.localStorage.getItem('jwtToken') || ''
                })
            })
            .then(response => {
                if(response.ok)
                    return response.json();
                else
                    return "{}";
            })
            .then(data => {
                setNumOfOrders(data.numOfOrders);
                setShowSpinner(false);
            })
            .catch(error => {
                toast.error('Server does not answer to get cart badge!', {});
                setShowSpinner(false);
            });
    }

    React.useEffect(() => {
        fetchCartBadge();
        var timerId = setInterval(() => {fetchCartBadge()}, 10000);
        return ()=>{clearInterval(timerId);}
    }, []);

    function logoutUser(){
        window.localStorage.removeItem('jwtToken');
        let h = createHistory()
        h.push('/login');
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }

    return (
        <header className="container-fluid header-container">
            {props.home ?
                <img src={logo} className="logo-img float-right cursor-pointer" alt="home" onClick={() => history.push('/')}/>
                : null
            }
            {props.cart ?
                <Spinner show={showSpinner} size='sm' spinnerPosition='baseline'>
                    <div id="cart" 
                        className="float-left cursor-pointer" 
                        onClick={() => setShowModal(true)}
                        >
                        <div className="glyph-icon flaticon-smart-cart cart-icon">
                            <span className="badge badge-cart"><PersianNumber number = {numOfOrders} /></span>
                        </div>
                    </div>
                </Spinner>
                : null
            }
            {props.account ?
                <div id="profile" className="float-left profile-link">
                    <span className="link-style cursor-pointer" onClick={() => history.push('/profile')}>حساب کاربری</span>
                </div>
                : null                
            }
            {props.exit ? 
                <div id="exit" className="float-left btn-exit cursor-pointer" onClick={() => {logoutUser()}}>
                    خروج
                </div>
                : null
            }
            <CartModal 
                show={showModal} 
                onHide={()=>setShowModal(false)}
                />
        </header>
    );

}
Header.propTypes = {
    exit: PropTypes.bool,
    account: PropTypes.bool,
    cart: PropTypes.bool,
    home: PropTypes.bool
};

Header.defaultProps = {
    exit: true,
    account: true,
    cart: true,
    home: true
}

export default Header