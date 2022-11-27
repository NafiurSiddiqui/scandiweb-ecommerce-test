import React, { Component } from 'react';

export default class NavCart extends Component {
	render() {
		return (
			<div className={`header-cart`}>
				<span className={`header-cart__btn`} role="button">
					&#x1F6D2;
				</span>

				<span className={`header-cart__badge`}></span>
			</div>
		);
	}
}
