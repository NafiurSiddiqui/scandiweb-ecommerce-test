import React, { Component } from 'react';
import DisplayHeader from '../../Layout/DisplayHeader';

import CartContainer from './CartContainer';

/**
 * @Task -1. Cart item total quantity badge on the cart icon should display the total cart item quantity not the cart item count.
 */

class Cart extends Component {
	render() {
		return (
			<section>
				<DisplayHeader>Cart</DisplayHeader>
				<CartContainer className="cart-page" cartPage={true} />
			</section>
		);
	}
}

export default Cart;
