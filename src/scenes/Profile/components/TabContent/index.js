import React from 'react'
import OrdersTabContent from './components/OrdersTabContent'
import IncreaseCreditTabContent from './components/IncreaseCreditTabContent'
import PropTypes from 'prop-types';
import './style.css'

function TabContent(props){
    var className = ''
    if(props.mode == 'increase-credit')
        className = 'form-group'
    return(
        <div className={"tab-content " + className}>
            {props.mode === 'orders' ? 
                <OrdersTabContent />
            :
                <IncreaseCreditTabContent />}
        </div>
    );
}

TabContent.propTypes = {
    mode: PropTypes.string,
}

TabContent.defaultProps = {
    mode: 'orders',
}

export default TabContent