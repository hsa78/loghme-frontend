import React from 'react';
import InputBox from '../InputBox';
import SubmitButton from '../SubmitButton'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
const createHistory = require("history").createBrowserHistory;

function SignForm(props){
    const [firstName, setFirstName]= useLocalStorageState('firstName');
    const [lastName, setLastName]= useLocalStorageState('lastName');
    const [email, setEmail] = useLocalStorageState('email');
    const [phoneNum, setPhoneNum]= useLocalStorageState('phoneNum');
    const [pass, setPass]= React.useState('');
    const [confirmPass, setConfirmPass]= React.useState('');
    const [confirmPassBorderColor, setConfirmPassBorderColor] = React.useState('none');
    const [emailBorderColor, setEmailBorderColor] = React.useState('none');
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [haveFirstName, setHaveFirstName] = React.useState(false);
    const [haveLastName, setHaveLastName] = React.useState(false);
    const [haveEmail, setHaveEmail] = React.useState(false);
    const [havePhoneNum, setHavePhoneNum] = React.useState(false);
    const [havePassword, setHavePassword] = React.useState(false);
    const [haveConfirmPassword, setHaveConfirmPassword] = React.useState(false);

    let history = useHistory();

    React.useEffect(() => {
        if(props.formType === 'signup'){
            setHaveFirstName(true);
            setHaveLastName(true);
            setHaveEmail(true);
            setHavePhoneNum(true);
            setHavePassword(true);
            setHaveConfirmPassword(true);
        }
        else if(props.formType === 'login'){
            setHaveEmail(true);
            setHavePassword(true);
        }
    }, [])


    function useLocalStorageState(key, defaultValue = '') {
        const [state, setState] = React.useState(
            () => window.localStorage.getItem(key) || defaultValue
        );
        
        React.useEffect(() => {
            window.localStorage.setItem(key, state);
        }, [key, state]);
        
        return [state, setState];
    }

    function saveChange(event, setter){
        setter(event.target.value);
    }

    function isValidPhoneNum(phoneNumber){
        if(phoneNumber.length > 11)
            return false;
        if(/^\d+$/.test(phoneNumber) || phoneNumber === '')
            return true;
        return false;
    }

    function handlePhoneNumChange(event, setter){
        if (isValidPhoneNum(event.target.value))
            saveChange(event, setter);
    }

    function isMatching(str1, str2){
        return str1 === str2;
    }

    React.useEffect(() => {
        if(isMatching(pass, confirmPass))
            if(confirmPass === '')
                setConfirmPassBorderColor('none');
            else
                setConfirmPassBorderColor('green');
        else 
            setConfirmPassBorderColor('red');
    },[pass,confirmPass])

    function isValidEmail(email){
        return emailRegex.test(email);
    }

    function handleEmailChange(event, setter){
        setter(event.target.value);
        if( isValidEmail(event.target.value))
            setEmailBorderColor('green');
        else
            setEmailBorderColor('red');
    }

    function isNotEmpty(state){
        return state !== '';
    }

    function registerUser(){
        var params = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phoneNum,
            "password": pass
        };
		var queryString = Object.keys(params).map(function(key) {
    		return key + '=' + params[key]
        }).join('&');
		const requestOptions = {
	        method: 'POST',
	        headers: { 
	        	'content-length' : queryString.length,
	        	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	        },
	        body: queryString
        };
	    
        fetch('http://localhost:8080/registration', requestOptions)
        .then(resp => {
                if (resp.ok){
                    let h = createHistory()
                    h.push('/login');
                    let pathUrl = window.location.href;
                    window.location.href = pathUrl;
                }
                else
                    toast.error('Something went wrong', {});
            }
        )
        .catch(error => {
            toast.error('Failed to get access to server!\nTry again later', {});
        });
    }

    function loginUser(){
        var params = {
            "email": email,
            "password": pass
        };
		var queryString = Object.keys(params).map(function(key) {
    		return key + '=' + params[key]
		}).join('&');
		const requestOptions = {
	        method: 'POST',
	        headers: { 
	        	'content-length' : queryString.length,
	        	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	        },
	        body: queryString
        };
	    
        fetch('http://localhost:8080/login', requestOptions)
        .then(resp => {
                if (resp.ok)
                    return resp.json();
                else
                    toast.error('Something went wrong', {});
            }
        )
        .then(data => {
            window.localStorage.setItem('jwtToken', data.jwtToken);
            let h = createHistory()
            h.push('/');
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
        })
        .catch(error => {
            toast.error('Failed to get access to server!\nTry again later', {});
        });
    }

    function handleSubmitClick(event){
        var hasError = false;
        event.preventDefault();
        if(haveFirstName && ! isNotEmpty(firstName)){
            toast.error('Please fill firstName', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
            });
            hasError = true;
        }
        if(haveLastName && ! isNotEmpty(lastName)){
            toast.error('Please fill lastName', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
            });
            hasError = true;
        }
        if(haveEmail && ! isValidEmail(email)){
            toast.error('Email is invalid', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
            });
            hasError = true;
        }
        if(havePhoneNum && ! (isValidPhoneNum(phoneNum) && phoneNum.length === 11)){
            toast.error('Phone number is incorrect', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
            });
            hasError = true;
        }
        if(havePassword && ! isNotEmpty(pass)){
            toast.error('Please fill password', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
            });
            hasError = true;
        }
        if(haveConfirmPassword && ! isMatching(pass, confirmPass)){
            toast.error('Password and confirm password does not match', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: false,
            });
            hasError = true;
        }
        if(! hasError){
            if(props.formType == 'signup')
                registerUser();
            else
                loginUser();
        }
    }

    return(
        <form >
            {haveFirstName ?
                <InputBox 
                    iconClassName="flaticon-account"
                    inputType="text"
                    name="firstName"
                    title="نام"
                    value={firstName}
                    setter={setFirstName}
                    onChange={saveChange}
                />
                : null
            }
            {haveLastName ?
                <InputBox 
                    iconClassName="flaticon-account"
                    inputType="text"
                    name="lastName"
                    title="نام خانوادگی"
                    value={lastName}
                    setter={setLastName}
                    onChange={saveChange}
                />
                : null
            }
            {haveEmail ?
                <InputBox 
                    iconClassName="flaticon-mail"
                    inputType="text"
                    name="email"
                    title="ایمیل"
                    value={email}
                    setter={setEmail}
                    onChange={handleEmailChange}
                    style={{borderColor: emailBorderColor}}
                />
                : null
            }
            {havePhoneNum ?
                <InputBox 
                    iconClassName="flaticon-phone"
                    inputType="tel"
                    name="tel"
                    title="شماره تلفن"
                    value={phoneNum}
                    setter={setPhoneNum}
                    onChange={handlePhoneNumChange}
                />
                : null
            }
            {havePassword ?
                <InputBox 
                    iconClassName="fas fa-lock"
                    inputType="password"
                    name="password"
                    title="رمز عبور"
                    setter={setPass}
                    onChange={saveChange}
                />
                : null
            }
            {haveConfirmPassword ?
                <InputBox 
                    iconClassName="fas fa-lock"
                    inputType="password"
                    name="password-confirm"
                    title="تکرار رمز عبور"
                    setter={setConfirmPass}
                    onChange={saveChange}
                    style={{borderColor: confirmPassBorderColor}}
                />
                : null
            }
            <SubmitButton 
                text = {props.formType === 'signup' ? 'ثبت‌نام' : 'ورود'}
                onClick={handleSubmitClick}
            />
        </form>
        
    );
    
}

SignForm.propTypes = {
    formType: PropTypes.string
}

SignForm.defaultProps = {
    formType: 'signup'
}

export default SignForm