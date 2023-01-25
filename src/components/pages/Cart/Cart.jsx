import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentWrapper from '../../Layout/ContentWrapper';
import DisplayHeader from '../../Layout/DisplayHeader';
import DisplayMessage from '../../Utilities/DisplayMessage';

import CartContainer from './CartContainer';

class Cart extends Component {
	render() {
		const { cartItems } = this.props;

		return (
			<ContentWrapper>
				<DisplayHeader>Cart</DisplayHeader>
				{cartItems.length === 0 ? (
					<DisplayMessage>Such an empty cart. 🙄 </DisplayMessage>
				) : (
					<CartContainer className="cart-page" cartPage={true} />
				)}
			</ContentWrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartItems: state.cart.cartItems,
	};
};
export default connect(mapStateToProps)(Cart);
