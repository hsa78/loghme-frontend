import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import cover from './images/Cover.jpg';
import Card from './components/Card/index'

class Sign extends React.Component{

    render(){
        const backgroundImgStyle = {
            backgroundImage: `url(${cover})`,
        };
        return(
            <div className="main-container container-fluid"
                 style={backgroundImgStyle}
            >
                <Card formType={this.props.type} />
            </div>
        );
    }
}

Sign.propTypes = {
    type: PropTypes.string
}

Sign.defaultProps = {
    type: "signup"
}

export default Sign