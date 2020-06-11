import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './style.css';

const createHistory = require("history").createBrowserHistory;

class SocialMediaLoginBox extends React.Component{
    constructor(props){
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
    }
    onSignIn(googleUser) {
        console.log(1);
        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;
        console.log(2);
        console.log(id_token);
        var params = {
            "email": profile.getEmail(),
            "idToken": id_token
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
	    
        fetch('http://185.166.105.6:30005/CA7_backend/googleLogin', requestOptions)
        .then(resp => {
                if (resp.ok)
                    return resp.json();
                else{
                    toast.error('Something went wrong', {});
                    let his = createHistory()
                    his.push('/signup');
                    let pathUrl = window.location.href;
                    window.location.href = pathUrl;
                }
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

    componentDidMount(){
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.async = true;
        document.body.appendChild(script);
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                client_id: '822539019781-se58ntb5ml53t7es2odus494vkifdtso.apps.googleusercontent.com',
                scope: 'profile'
            })
          }
        );

        window.gapi.signin2.render('g-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 200,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSignIn,
            'onfailure': this.onFailure
          });

    }

    render(){
        return(
            <React.Fragment>
                <div className="gbox">
                        <p>ورود از طریق</p>
                        <div id="g-signin2"></div>
                        {/* <i className="fab fa-google" data-onsuccess="onSignIn"></i> */}
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-facebook"></i>
                </div>
            </React.Fragment>
            

        );
    }
}

export default SocialMediaLoginBox