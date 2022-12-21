import React, { Component } from 'react';
import CartContainer from './CartContainer';

export default class MiniCart extends Component {
	render() {
		return (
			<section className="mini-cart-container">
				<div className="mini-cart__headers">
					<h2 className="mini-cart__header">My Bag,</h2>
					<h3 className="mini-cart__item-count">2items</h3>
				</div>
				<CartContainer className="mini-cart__items" />
			</section>
		);
	}
}
