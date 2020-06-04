import React from 'react';
import SocialMediaLoginBox from '../SocialMediaLoginBox';
import './style.css';
import logo from './images/LOGO.png';
import SignForm from '../SignForm'
import PropTypes from 'prop-types'

class Card extends React.Component{

    render(){
        return(
            <div className="card">
                <img src={logo} className="logo" alt="Logheme"/>
                <SignForm formType = {this.props.formType}/>
                <SocialMediaLoginBox />
            </div>
        );
    }
}

Card.propTypes = {
    formType: PropTypes.string
}

Card.defaultProps = {
    formType: 'signup'
}

export default Card