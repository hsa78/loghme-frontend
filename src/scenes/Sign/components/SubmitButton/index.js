import './style.css';
import React from 'react';
import PropTypes from 'prop-types'

function SubmitButton(props){
    return (
        <a href={props.href} className="button" onClick={(e)=>props.onClick(e)}><b>{props.text}</b></a>
    );
}

SubmitButton.propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
}

SubmitButton.defaultProps = {
    href: '',
    onClick: (e) => {},
    text: '',
}

export default SubmitButton