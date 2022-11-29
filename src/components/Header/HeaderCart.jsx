import React, { Component } from 'react';
import MiniCartIcon from '../assets/MiniCartIcon';
export default class HeaderCart extends Component {
	render() {
		return (
			<div className={`header-cart`}>
				<MiniCartIcon color={'#43464E'} className={'header-cart__cart'} />

				<span className={`header-cart__badge`}></span>
			</div>
		);
	}
}
