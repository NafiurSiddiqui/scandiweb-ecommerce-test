import React, { Component } from 'react';
import { connect } from 'react-redux';
import MiniCartIcon from '../assets/MiniCartIcon';

class HeaderCart extends Component {
	render() {
		const { cartItems } = this.props;

		return (
			<div className={`header-cart`}>
				<MiniCartIcon color={'#43464E'} className={'header-cart__cart'} />

				<div
					className={`header-cart__badge ${
						cartItems.length > 0 ? 'visible' : ''
					}`}
				>
					<span className="header-cart__badge-quantity">
						{cartItems.length}
					</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartItems: state.cart.cartItems,
	};
};

export default connect(mapStateToProps)(HeaderCart);
