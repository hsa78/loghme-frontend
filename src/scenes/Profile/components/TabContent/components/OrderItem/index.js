import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CartDetailModal from '../CartDetailModal'
import PersianNumber from '../../../../../../util/util';

function OrderItem(props){
    const [modalShow, setModalShow] = React.useState(false);
    var statusText = '';
    var statusClassName = '';

    if(props.status == 'SearchingForDelivery'){
        statusText = 'در جستجوی پیک';
        statusClassName = 'status-searching'
    }
    else if(props.status == 'DeliveryIsOnTheWay'){
        statusText = 'پیک در مسیر';
        statusClassName = 'status-in-the-way';
    }
    else if(props.status == 'Delivered'){
        statusText = 'مشاهده فاکتور';
        statusClassName = 'status-view-factor';
    }

    function showFactor(event){
        if(event.target.className.includes('status-view-factor')){
            setModalShow(true);
        }
    }

    return(
        <React.Fragment>
            <div className="order-item row" id={props.id}>
                <div className="col-md-1 pt-2 pb-2">
                    <PersianNumber number = {props.num} />
                </div>
                <div className="col-md-6 right-border pt-2 pb-2">
                    {props.restaurantName}
                </div>
                <div className="col-md-5 right-border pt-2 pb-2">
                    <div className={"status " + statusClassName} onClick={e => showFactor(e)}>
                        {statusText}
                    </div>
                </div>
            </div>
            <CartDetailModal cartId={props.id} show={modalShow} onHide={()=>setModalShow(false)}/>
        </React.Fragment>
    );
}

OrderItem.propTypes = {
    num: PropTypes.number,
    restaurantName: PropTypes.string,
    status: PropTypes.string,
    id:PropTypes.string
}

OrderItem.defaultProps = {
    num: 0,
    restaurantName: '',
    status: 'searching',
    id:''
}

export default OrderItem