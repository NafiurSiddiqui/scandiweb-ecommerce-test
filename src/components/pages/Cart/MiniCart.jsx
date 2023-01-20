import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overlay from '../../UI/Overlay';
import OutsideClickGuard from '../../Utilities/OutsideClickGuard';
import CartContainer from './CartContainer';

class MiniCart extends Component {
	render() {
		const { cartItems } = this.props;

		return (
			<OutsideClickGuard className={`mini-cart guard`}>
				<Overlay className=" mini-cart-overlay">
					<section className="mini-cart-container">
						<div className="mini-cart__headers">
							<h2 className="mini-cart__header">My Bag,</h2>
							<span className="mini-cart__item-count">
								{cartItems.length ? cartItems.length : 0} items
							</span>
						</div>
						<CartContainer className="mini-cart__items" />
					</section>
				</Overlay>
			</OutsideClickGuard>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartItems: state.cart.cartItems,
	};
};

export default connect(mapStateToProps)(MiniCart);
