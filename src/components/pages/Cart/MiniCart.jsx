import React, { Component } from 'react';
import Overlay from '../../UI/Overlay';
import OutsideClickGuard from '../../Utilities/OutsideClickGuard';
import CartContainer from './CartContainer';

export default class MiniCart extends Component {
	render() {
		return (
			<OutsideClickGuard className={`mini-cart guard`}>
				<Overlay className=" mini-cart-overlay">
					<section className="mini-cart-container">
						<div className="mini-cart__headers">
							<h2 className="mini-cart__header">My Bag,</h2>
							<span className="mini-cart__item-count">2items</span>
						</div>
						<CartContainer className="mini-cart__items" />
					</section>
				</Overlay>
			</OutsideClickGuard>
		);
	}
}
