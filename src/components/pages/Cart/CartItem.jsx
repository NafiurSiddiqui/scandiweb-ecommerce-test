import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	cartQuantityHandler,
	decrementItem,
	incrementItem,
} from '../../store/cartSlice';
import DescriptionCard from '../../UI/DescriptionCard';

import CartQuantitiy from './CartQuantitiy';

class CartItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imageCount: 0,
			itemPrice: 0,
			brand: '',
			name: '',
			attributes: [],
			gallery: [],
			quantity: null,
			inStock: null,
		};
		this.incrementCount = this.incrementCount.bind(this);
		this.decrementCount = this.decrementCount.bind(this);
		this.setItemPriceHandler = this.setItemPriceHandler.bind(this);
	}

	componentDidMount() {
		const { cartItem } = this.props;

		this.setState({
			brand: cartItem?.brand,
			name: cartItem?.name,
			attributes: cartItem?.attributes,
			gallery: cartItem?.gallery,
			inStock: cartItem?.inStock,
			quantity: cartItem?.quantity.quantity,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const { cartItem, itemIndex } = this.props;

		const { quantity } = cartItem.quantity;

		const prevPropQt = prevProps.cartItem.quantity.quantity;

		if (prevPropQt !== quantity) {
			this.setState({
				quantity: quantity,
			});
			this.props.cartQuantityHandler();
		}

		if (prevState.itemPrice !== this.state.itemPrice) {
			this.props.cumulativePriceHandler(this.state.itemPrice, itemIndex, true);
		}
	}

	componentWillUnmount() {
		this.props.cartQuantityHandler();
	}

	incrementCount() {
		this.setState({
			imageCount: this.state.imageCount + 1,
		});
	}

	decrementCount() {
		this.setState({
			imageCount: this.state.imageCount - 1,
		});
	}

	setItemPriceHandler(price) {
		this.setState({
			itemPrice: price,
		});
	}

	render() {
		const { cartItem, incrementItem, decrementItem, cartPage } = this.props;

		const { imageCount, attributes, gallery, quantity } = this.state;

		let imageLength = gallery.length;

		let btnGuardRight = {
			visibility: imageCount === imageLength - 1 ? 'hidden' : 'visible',
		};

		let btnGuardLeft = {
			visibility: imageCount === 0 ? 'hidden' : 'visible',
		};

		const btnsGuard = {
			visibility: imageLength === 1 ? 'hidden' : 'visible',
		};

		const itemBorder = {
			borderTop: '1px solid silver',
			borderBottom: '1px solid silver',
			borderLeft: 'none',
			borderRight: 'none',
			padding: '0.8rem 0',
		};

		return (
			<li
				className="cart-items__item"
				style={cartPage ? { ...itemBorder } : {}}
			>
				<DescriptionCard
					className="cart-items__pd"
					product={cartItem}
					miniCart={true}
					attributes={attributes}
					quantity={quantity}
					cartPage={cartPage}
					prices={cartItem.prices}
					setItemPriceHandler={this.setItemPriceHandler}
				/>

				<div
					className={
						cartPage ? 'cart-page__qt-wrapper' : 'cart-quantity-wrapper'
					}
				>
					<CartQuantitiy
						images={gallery}
						imageCount={imageCount}
						quantity={quantity}
						incrementItem={incrementItem}
						decrementItem={decrementItem}
						attributes={cartItem}
						cartPage={cartPage}
					/>

					<div
						className="cart-quantity__image-gallery-btns"
						style={{ ...btnsGuard }}
					>
						<span
							className="cart-quantity__image-gallery-btn"
							role={'button'}
							onClick={this.decrementCount}
							style={{ ...btnGuardLeft }}
						>
							ᐸ
						</span>
						<span
							className="cart-quantity__image-gallery-btn"
							ole={'button'}
							onClick={this.incrementCount}
							style={{ ...btnGuardRight }}
						>
							ᐳ
						</span>
					</div>
				</div>
			</li>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productID: state.products.productID,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = {
	incrementItem,
	decrementItem,
	cartQuantityHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
