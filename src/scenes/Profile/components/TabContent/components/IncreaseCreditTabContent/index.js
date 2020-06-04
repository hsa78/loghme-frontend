import React from 'react'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function IncreaseCreditTabContent(props){
    const [value, setValue] = React.useState('');

    function handlChange(event){
        if(/^\d+$/.test(event.target.value) || event.target.value === '')
            setValue(event.target.value)
    }

    function handleClick(event){
        if(value === ''){
            toast.error('Please enter a value.', {autoClose:false})
        }
        else{
            var params = {
                "value": value
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
            fetch('http://localhost:8080/user/credit', requestOptions)
            .then(resp => {
                    if (resp.ok){
                        setValue('');
                        toast.success('Credit increased successfuly.', {})
                    }
                    else{
                        toast.error('Sorry! something in server went wrong.', {autoClose: false})
                    }
                }
            )
            .catch(error => {
                toast.error('Failed to get access to server!', {});
            });
        }
        event.preventDefault();
    }

    return(
        <React.Fragment>
            <input 
                type="text" 
                className="inp" 
                id="increase-credit-input" 
                placeholder="میزان افزایش اعتبار" 
                onChange={e => handlChange(e)} 
                value = {value}
            />
            <div className="increase-credit-btn" onClick={(e) => handleClick(e)}>افزایش </div>
        </React.Fragment>
    );
}

export default IncreaseCreditTabContent