import React from 'react'
import SearchBox from '../SearchBox'
import FoodPartyContainer from '../FoodPartyContainer'
import RestaurantsMenuContainer from '../RestaurantsMenuContainer'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomeContent(props){
    const [foodName, setFoodName] = React.useState('');
    const [restaurantName, setRestaurantName] = React.useState('');
    const [pageNum, setPageNum] = React.useState(0);
    const [searchMode, setSearchMode] = React.useState(false);
    const [activeLoadMore, setActiveLoadMore] = React.useState(true);

    function handleSearchChange(event, name){
        if(name === "foodName"){
            setFoodName(event.target.value);

        }
        else if(name == "restaurantName"){
            setRestaurantName(event.target.value);

        }
    }

    function handleSerachClick(event){
        event.preventDefault();
        const isSearchBtn = event.target.className === "search-button"
       
        if(! foodName && ! restaurantName)
            toast.error("Please fill all fields.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false
            });
        else{
            setShowSpinner(true);
            setSearchMode(true);
            if(isSearchBtn){
                setPageNum(1);
            }
            else{
                setPageNum(pageNum + 1);
            }
            
            var params = {
                "foodName": foodName,
                "restaurantName" : restaurantName,
                "page" : isSearchBtn ? 1 : pageNum + 1,
                "numOfItems" : 5
            };
            var queryString = Object.keys(params).map(function(key) {
                return key + '=' + params[key]
            }).join('&');
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'content-length' : queryString.length,
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': window.localStorage.getItem('jwtToken') || ''
                },
                body: queryString
            };
            
            fetch('http://localhost:8080/search', requestOptions)
            .then(resp => {
                    if (resp.ok)
                        return resp.json();
                    else
                        return "[]";
                }
            )
            .then(data => {
                if(data.length === 0)
                    setActiveLoadMore(false);
                else{
                    if(isSearchBtn){
                        setRestaurants(data);
                    }
                    else 
                    {
                        setRestaurants(restaurants.concat(data));
                    }
                }
                
                
                setShowSpinner(false);
            })
            .catch(error => {
                toast.error('Failed to get access to server!\nTry again later', {});
            });
        }
    }

    const [restaurants, setRestaurants] = React.useState([]);
    const [showSpinner, setShowSpinner] = React.useState(false);

    function loadRestaurants(){
        if(!searchMode){

            setShowSpinner(true);
            setSearchMode(false);
            setPageNum(pageNum + 1);
            var params = {
                "page" : pageNum + 1,
                "numOfItems" : 10
            };
            var queryString = Object.keys(params).map(function(key) {
                return key + '=' + params[key]
            }).join('&');
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'content-length' : queryString.length,
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization': window.localStorage.getItem('jwtToken') || ''
                },
                body: queryString
            };
            fetch('http://localhost:8080/restaurant/all', requestOptions)
              .then(resp => {
                    if (resp.ok)
                      return resp.json();
                    else
                      return "[]";
                  }
              )
              .then(data => {
                    if(data.length === 0){
                        setActiveLoadMore(false);
                        setShowSpinner(false);
                    }
                    else{
                        setRestaurants(restaurants.concat(data));
                        setShowSpinner(false);
                    }
              })
              .catch(error => {
                  toast.error('Failed to get restaurants!', {});
                  setShowSpinner(false);
              });
        }
    }

    React.useEffect(()=> {
        loadRestaurants();
        
    } , []);

    function loadMore(event){
        if(searchMode){
            handleSerachClick(event);
        }
        else{
            loadRestaurants();
        }
    }

    return (
        <div className="content-container">
            <SearchBox 
                onClick={handleSerachClick} 
                onChange={handleSearchChange}
                foodName={foodName}
                restaurantName={restaurantName}
            />
            <FoodPartyContainer />
            <RestaurantsMenuContainer showSpinner={showSpinner} restaurants={restaurants}/>
            <button 
                onClick={(e) => loadMore(e)} 
                type="button" 
                className="load-more"
                disabled={!activeLoadMore}
            >
                Load more
            </button>
        </div>
    );
}

export default HomeContent