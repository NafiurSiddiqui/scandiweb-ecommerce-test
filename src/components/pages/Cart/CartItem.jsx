import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrementItem, incrementItem } from '../../store/cartSlice';
import DescriptionCard from '../../UI/DescriptionCard';
import productHandler from '../../Utilities/ProductHandler';
import CartQuantitiy from './CartQuantitiy';

/**
 * @cartItem = ['productID', [items]]
 */

//* MOVE the pricing to the DES card if state price works

class CartItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imageCount: 0,
			itemPrice: 0,
		};
		this.incrementCount = this.incrementCount.bind(this);
		this.decrementCount = this.decrementCount.bind(this);
	}

	componentDidMount() {
		const { cartItem, products, selectedCurrency } = this.props;

		const [PDP] = productHandler(products, cartItem[0], selectedCurrency);

		this.setState({
			itemPrice: PDP[0].amount,
		});

		this.props.itemPriceHandler(PDP[0].amount);
	}

	componentDidUpdate(prevProps) {
		const { cartItem, products, selectedCurrency, itemIndex } = this.props;

		const [PDP] = productHandler(products, cartItem[0], selectedCurrency);

		const quantity = cartItem[2].quantity;

		if (prevProps.cartItem[2].quantity !== cartItem[2].quantity) {
			this.setState({
				itemPrice: PDP[0].amount * quantity,
			});

			this.props.itemPriceHandler(PDP[0].amount * quantity, itemIndex, true);
		}
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

	render() {
		const {
			cartItem,
			incrementItem,
			decrementItem,
			products,
			selectedCurrency,
		} = this.props;

		const { imageCount } = this.state;

		const quantity = cartItem[2].quantity;

		const [PDP] = productHandler(products, cartItem[0], selectedCurrency);

		let imageLength = PDP[0]?.images.length;

		let btnGuardRight = {
			visibility: imageCount === imageLength - 1 ? 'hidden' : 'visible',
		};

		let btnGuardLeft = {
			visibility: imageCount === 0 ? 'hidden' : 'visible',
		};

		const btnsGuard = {
			visibility: imageLength === 1 ? 'hidden' : 'visible',
		};

		return (
			<li className="cart-items__item">
				<DescriptionCard
					className="cart-items__pd"
					products={PDP[0]}
					miniCart={true}
					attributes={cartItem}
					quantity={quantity}
				/>

				<div className="cart-quantity-wrapper">
					<CartQuantitiy
						images={PDP[0].images}
						imageCount={imageCount}
						quantity={quantity}
						incrementItem={incrementItem}
						decrementItem={decrementItem}
						attributes={cartItem}
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
		products: state.products.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = { incrementItem, decrementItem };

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
