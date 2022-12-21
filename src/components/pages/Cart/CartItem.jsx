import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';
import CartQuantitiy from './CartQuantitiy';

export default class CartItem extends Component {
	render() {
		return (
			<li className="cart-items__item">
				<DescriptionCard />
				<CartQuantitiy />
			</li>
		);
	}
}
