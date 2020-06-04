import React from 'react'
import './style.css'
import TabItem from '../TabItem'
import PropTypes from 'prop-types';


function TabMenu(props){
    return(
        <ul className="tab-menu nav nav-pills">
            <TabItem 
                id="orders-tab"
                className={props.mode == 'orders' ? 'nav-active': ''}
                onClick={props.onClick}
                text='سفارش‌ها'
            />
            <TabItem 
                id="increase-credit-tab"
                className={props.mode == 'increase-credit' ? 'nav-active': ''}
                onClick={props.onClick}
                text='افزایش اعتبار'
            />
        </ul>
    );
}

TabMenu.propTypes = {
    mode: PropTypes.string,
    onClick: PropTypes.func
}

TabMenu.defaultProps = {
    mode: 'orders',
    onClick: () => {}
}

export default TabMenu