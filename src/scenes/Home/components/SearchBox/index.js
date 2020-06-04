import React from 'react'
import './style.css'

function SeachBox(props){
    


    
    return(
        <form className="search-box">
            <SearchInput 
                name="foodName" 
                placeholder="نام غذا" 
                value={props.foodName} 
                onChange={props.onChange} 
            />
            <SearchInput 
                name="restaurantName" 
                placeholder="نام رستوران" 
                value={props.restaurantName} 
                onChange={props.onChange} 
            />
            <button className="search-button" onClick={e => props.onClick(e)}>جست‌وجو</button>
        </form>
    );
}

function SearchInput(props){
    return(
        <input className="search-input" {...props} onChange={e => props.onChange(e,props.name)}/>
    );
}

export default SeachBox