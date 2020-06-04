import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Cart from '../../scenes/RestaurantPage/components/Restaurant/components/Cart'


function CartModal(props){
    return (
        <Modal className="cart-modal-content"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="cart-modal-body" closeButton>
                <Cart />
            </Modal.Body>   
        </Modal>
    );
}

export default CartModal