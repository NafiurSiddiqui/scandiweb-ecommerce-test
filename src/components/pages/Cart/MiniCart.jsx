import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overlay from '../../UI/Overlay';
import DisplayMessage from '../../Utilities/DisplayMessage';
import OutsideClickGuard from '../../Utilities/OutsideClickGuard';
import CartContainer from './CartContainer';

class MiniCart extends Component {
	render() {
		const { cartItems, cartQuantity } = this.props;

		return (
			<OutsideClickGuard className={`mini-cart guard`}>
				<Overlay className=" mini-cart-overlay">
					<section className="mini-cart-container">
						<div className="mini-cart__headers">
							<h2 className="mini-cart__header">My Bag,</h2>
							<span className="mini-cart__item-count">
								{cartQuantity} items
							</span>
						</div>

						{cartItems.length === 0 ? (
							// <DisplayMessage>Such an empty cart. 🙂 </DisplayMessage>
							<DisplayMessage />
						) : (
							<CartContainer miniCart={true} className="mini-cart__items" />
						)}
					</section>
				</Overlay>
			</OutsideClickGuard>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartItems: state.cart.cartItems,
		cartQuantity: state.cart.cartQuantity,
	};
};

export default connect(mapStateToProps)(MiniCart);
