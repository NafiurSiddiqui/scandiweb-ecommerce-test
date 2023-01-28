import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overlay from '../../UI/Overlay';
import DisplayMessage from '../../Utilities/DisplayMessage';
import OutsideClickGuard from '../../Utilities/OutsideClickGuard';
import CartContainer from './CartContainer';
import { Link } from 'react-router-dom';
import { setMiniCartIsOpen } from '../../store/cartSlice';
import Button from '../../UI/Button';

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
							<DisplayMessage />
						) : (
							<>
								<CartContainer miniCart={true} className="mini-cart__items" />
								<div className="cart-btns">
									<Link
										to="Cart"
										className="cart-btns__btn view-bag"
										onClick={() => setMiniCartIsOpen(false)}
									>
										VIEW BAG
									</Link>

									<Button className={`cart-btns__btn mini-cart-pricing-btn `}>
										CHECKOUT
									</Button>
								</div>
							</>
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

export default connect(mapStateToProps, { setMiniCartIsOpen })(MiniCart);
