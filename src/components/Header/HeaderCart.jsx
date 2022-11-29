import React, { Component } from 'react';
import miniCart from '../assets/Mini-cart.svg';

export default class HeaderCart extends Component {
	render() {
		return (
			<div className={`header-cart`}>
				<span className={`header-cart__cart cart-btn`} role="button">
					<img src={miniCart} alt="cart-icon" />
				</span>

				<span className={`header-cart__badge`}></span>
			</div>
		);
	}
}
