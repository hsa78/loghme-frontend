import React from 'react'
import UnderLinedTitle from '../UnderLinedTitle'
import RemainingTimeBox from '../RemainingTimeBox'
import FoodPartyMenu from '../FoodPartyMenu'
import foodImg from '../FoodPartyMenu/images/pizza.jpg'
import './style.css'
import Spinner from '../../../../components/Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const defaultTime = {minutes: 0, seconds: 0};
const foodPartyMenuDefault = [{image: foodImg, name: 'پیتزا', popularity: 5, oldPrice: 39000, price: 29000, count: 3, restaurantName: 'رستوران خامس', restaurantId: '123'},
                              {image: foodImg, name: 'پیتزا اعلای خوشمزه تن‌تنانی فوق‌العاده خوب عالی. بهتر از این هیچ جا پیدا نمیشه', popularity: 5, oldPrice: 44000, price: 39000, count: 0, restaurantName: 'رستوران خامس', restaurantId: '124'},
                              {image: foodImg, name: 'پیتزا', popularity: 5, oldPrice: 39000, price: 29000, count: 3, restaurantName: 'رستوران خامس', restaurantId: '125'},
                              {image: foodImg, name: 'پیتزا', popularity: 5, oldPrice: 39000, price: 29000, count: 3, restaurantName: 'رستوران خامس', restaurantId: '126'},
                              {image: foodImg, name: 'پیتزا', popularity: 5, oldPrice: 39000, price: 29000, count: 3, restaurantName: 'رستوران خامس', restaurantId: '127'},
                              {image: foodImg, name: 'پیتزا', popularity: 5, oldPrice: 39000, price: 29000, count: 3, restaurantName: 'رستوران خامس', restaurantId: '128'}
                            ];


function FoodPartyContainer (props){
    const [remainingTime, setRemainingTime] = React.useState(defaultTime);
    const [menu, setMenu] = React.useState([]);
    const [showSpinner, setShowSpinner] = React.useState(false);

    React.useEffect(()=> {
        if(remainingTime.minutes === 0 && remainingTime.seconds === 0){
            // alert('gettingTime');
            setShowSpinner(true);
            fetch('http://185.166.105.6:30005/CA7_backend/foodParty/view', { 
                method: 'GET', 
                headers: new Headers({
                'Authorization': window.localStorage.getItem('jwtToken') || ''
                })
            })
            .then(resp => {
                  if (resp.ok)
                    return resp.json();
                  else
                    return "[]";
                }
            )
            .then(data => {
                setMenu(data);
            })
            .catch(error => {
                toast.error('Server does not answer to get foodParty!', {});
                setShowSpinner(false);
            });

            fetch('http://185.166.105.6:30005/CA7_backend/foodParty/time', { 
                method: 'GET', 
                headers: new Headers({
                'Authorization': window.localStorage.getItem('jwtToken') || ''
                })
            })
            .then(resp => {
                if (resp.ok)
                    return resp.json();
                else
                    return "{}";
            })
            .then(data => {
                setRemainingTime(data);
                setShowSpinner(false);
            })
            .catch(error => {
                setShowSpinner(false);
            });
        }
    }, [remainingTime]);   

    function saveTime(time){
        setRemainingTime(time);
    }

    return(
        <div className="food-party-container">
            <UnderLinedTitle text="جشن غذا"/>
            <Spinner show={showSpinner} >
                <RemainingTimeBox remainingTime={remainingTime} timeSetter={saveTime} />
                <FoodPartyMenu menu={menu}/>
            </Spinner>
        </div>  
    );
}

export default FoodPartyContainer