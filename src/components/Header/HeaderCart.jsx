import React, { Component } from 'react';
import { connect } from 'react-redux';
import MiniCartIcon from '../assets/MiniCartIcon';
import { setMiniCartIsOpen } from '../store/cartSlice';

class HeaderCart extends Component {
	constructor(props) {
		super(props);

		this.openMiniCart = this.openMiniCart.bind(this);
	}

	openMiniCart() {
		this.props.setMiniCartIsOpen();
	}
	render() {
		const { cartItems, cartQuantity } = this.props;

		const badgeGuard = cartItems.includes(undefined);

		return (
			<div className={`header-cart`} onClick={this.openMiniCart}>
				<MiniCartIcon color={'#43464E'} className={'header-cart__cart'} />

				<div
					className={`header-cart__badge ${
						cartQuantity > 0 && !badgeGuard ? 'visible' : ''
					}`}
				>
					<span className="header-cart__badge-quantity">
						{badgeGuard ? null : cartQuantity}
					</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartItems: state.cart.cartItems,
		miniCartState: state.cart.miniCartIsOpen,
		cartQuantity: state.cart.cartQuantity,
	};
};

const mapDispatchToProps = { setMiniCartIsOpen };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCart);
