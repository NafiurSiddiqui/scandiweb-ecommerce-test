import React, { Component } from 'react';
import { connect } from 'react-redux';

import DescriptionCard from '../../UI/DescriptionCard';
import CartQuantitiy from './CartQuantitiy';

class CartItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			PDP: null,
			imageCount: 0,
		};
		this.incrementCount = this.incrementCount.bind(this);
		this.decrementCount = this.decrementCount.bind(this);
	}

	componentDidMount() {
		const { products, selectedCurrency } = this.props.products;

		let filteredProduct = products?.filter(
			(item) => item.id === 'huarache-x-stussy-le'
		);

		let PDP = filteredProduct?.map((item) => {
			return {
				brand: item.brand,
				name: item.name,
				images: item.gallery,
				attributesID: item.attributes.map((item) => item.id),
				attributesItem: item.attributes.map((item) =>
					item.items.map((item) => item.id)
				),

				prices: item.prices.filter((item) => {
					if (selectedCurrency !== undefined || null) {
						return item.currency.label === selectedCurrency.currency;
					} else {
						return item.currency.label === 'USD';
					}
				}),
				get amount() {
					return this.prices[0].amount;
				},
				stock: item.inStock,
			};
		});

		this.setState({
			PDP: PDP,
		});
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
		const { products, selectedCurrency } = this.props.products;

		const { imageCount } = this.state;

		//filter out the cartItem
		// let filteredProduct = products.filter((item) => item.id === productID);
		let filteredProduct = products?.filter((item) => item.id === 'ps-5');

		// return PDP as an OBJECT

		let PDP = filteredProduct?.map((item) => {
			return {
				brand: item.brand,
				name: item.name,
				images: item.gallery,
				attributesID: item.attributes.map((item) => item.id),
				attributesItem: item.attributes.map((item) =>
					item.items.map((item) => item.id)
				),

				prices: item.prices.filter((item) => {
					if (selectedCurrency !== undefined || null) {
						return item.currency.label === selectedCurrency.currency;
					} else {
						return item.currency.label === 'USD';
					}
				}),
				get amount() {
					return this.prices[0].amount;
				},
				stock: item.inStock,
			};
		});

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
				/>

				<div className="cart-quantity-wrapper">
					<CartQuantitiy images={PDP[0].images} imageCount={imageCount} />

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
		products: state.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

export default connect(mapStateToProps)(CartItem);
