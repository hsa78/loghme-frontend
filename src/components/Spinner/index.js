import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function Spinner(props){
    const spinnerSizeStyle = {
        width: props.size === 'sm' ? '1rem' : props.size === 'lg' ? '3rem' : '2rem',
        height:  props.size === 'sm' ? '1rem' : props.size === 'lg' ? '3rem' : '2rem',
    }
    return(
        props.show ?
            <div className="text-center full-container" style={{alignItems: props.spinnerPosition}}>
                <div className="spinner-border spinner" style ={spinnerSizeStyle} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                {props.children}
            </div>
            : props.children
    );
}

Spinner.propTypes = {
    show: PropTypes.bool,
    size: PropTypes.string,
    spinnerPosition: PropTypes.string,
}

Spinner.defaultProps = {
    show: false,
    size: 'md',
    spinnerPosition: 'center'

}

export default Spinner