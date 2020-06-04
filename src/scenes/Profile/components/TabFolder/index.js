import React from 'react'
import './style.css'
import TabMenu from '../TabMenu'
import TabContent from '../TabContent'

function TabFolder(props){
    const [mode, setMode] = React.useState('orders');

    function handleClick(e){
        if(e.target.id == 'orders-tab')
            setMode('orders')
        else if(e.target.id == 'increase-credit-tab')
            setMode('increase-credit')
    }

    return(
        <div id="tab-folder" className="tab-folder">
            <TabMenu onClick={handleClick} mode={mode}/>
            <TabContent mode={mode}/>
        </div>
    );
}

export default TabFolder