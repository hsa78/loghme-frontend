import React from 'react';
import './style.css';
import InfoItem from '../InfoItem';
import Spinner from '../../../../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class InfoBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            phoneNum: '',
            credit: '0',
            showSpinner: false,
        };
    }

    fetchPersonalInfo(){
        this.setState(prevState => ({showSpinner: true}));
        fetch('http://185.166.105.6:30005/CA7_backend/user/info',{ 
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
            }
        )
        .then(data => this.setState(prevState => ({ name : data.firstName + ' ' + data.lastName, email: data.email, phoneNum: data.phone})))
        .catch(error => {
            toast.error('Failed to get user info!', {});
        });
    }

    fetchCredit(){
        fetch('http://185.166.105.6:30005/CA7_backend/user/credit',{ 
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
            }
        )
        .then(data => this.setState(prevState => ({ credit : data.credit, showSpinner: false})))
        .catch(error => {
            this.setState(prevState => ({showSpinner: false}));
        });
    }

    componentDidMount(){
        this.fetchPersonalInfo();
        this.fetchCredit();
        this.timerId = setInterval(() => {this.fetchCredit()}, 10000);
    }

    render(){
        return(
            <Spinner show={this.state.showSpinner}>
                <div id="info" className="info-container clearfix p-5 ">   
                    <InfoItem 
                        infoItemClassName="name-info"
                        iconClassName="glyph-icon flaticon-account account-icon d-inline"
                        infoText={this.state.name}
                    />
                    <div>
                        <InfoItem 
                            iconClassName="glyph-icon flaticon-phone d-inline"
                            infoText={this.state.phoneNum}
                        />
                        <InfoItem 
                            iconClassName="glyph-icon flaticon-mail d-inline"
                            infoText={this.state.email}
                            />
                        <InfoItem 
                            infoItemClassName="d-flex"
                            iconClassName="glyph-icon flaticon-card d-inline"
                            infoText={this.state.credit + ' تومان'}
                            />
                    </div>
                </div>
            </Spinner>
        );
    }
}

export default InfoBox