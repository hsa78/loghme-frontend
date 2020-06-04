import React from 'react'
import PropTypes from 'prop-types';
import './style.css'

function TabItem(props){
    return(
        <li id={props.id} className={"tab-item nav-item " + props.className} onClick={e => props.onClick(e)}>
                {props.text}
        </li>
    );
}

TabItem.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
};

TabItem.defaultProps = {
    id: '',
    className: '',
    text: '',
    onClick: (e)=>{}
};

export default TabItem