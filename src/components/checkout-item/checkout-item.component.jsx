import React from 'react';
import './checkout-item.styles.scss';
// import { connect } from 'react-redux';
// import { toggleCartHidden } from '../../redux/cart/cart.actions';
// import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CheckoutItem = ({ cartItem: { imageUrl, price, name, quantity } }) => (
  <div className="checkout-item">
    <div className="image-container">
      <img src={imageUrl} alt="item" />
    </div>
    <span className="name">{name}</span>
    <span className="quantity">{quantity}</span>
    <span className="price">R{price}</span>
    <div className="remove-button">&#10005;</div>
  </div>
);

export default CheckoutItem;
