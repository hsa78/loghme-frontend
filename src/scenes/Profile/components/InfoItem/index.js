import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import PersianNumber from '../../../../util/util';


function InfoItem(props){
    return (
        <div className={props.infoItemClassName}>
            <div className={props.iconClassName}></div>
            <div className='d-inline ${props.infoClassName}'><PersianNumber text = {props.infoText} /></div>
        </div>
    );
}

InfoItem.propTypes = {
    infoItemClassName: PropTypes.string,
    iconClassName: PropTypes.string,
    infoClassName: PropTypes.string,
    infoText: PropTypes.string
}

InfoItem.defaultProps = {
    infoItemClassName: '',
    iconClassName: '',
    infoClassName: '',
    infoText: ''
}

export default InfoItem