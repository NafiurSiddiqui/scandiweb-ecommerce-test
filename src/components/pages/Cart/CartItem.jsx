import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrement, increment } from '../../store/counter';
import { setSelectedProduct } from '../../store/productsSlice';
import DescriptionCard from '../../UI/DescriptionCard';
import CartQuantitiy from './CartQuantitiy';

class CartItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			PDP: null,
		};
		// this.handleProducts = this.handleProducts.bind(this);
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

	render() {
		const { products, selectedCurrency } = this.props.products;
		const { increment, decrement, imageCount } = this.props;

		// console.log(imageCount);
		//filter out the cartItem
		// let filteredProduct = products.filter((item) => item.id === productID);
		let filteredProduct = products?.filter((item) => item.id === 'ps-5');

		// console.log(
		// 	filteredProduct.map((item) =>
		// 		item.prices.filter((item) => item.currency.label === 'USD')
		// 	)
		// );

		// console.log(selectedCurrency === undefined);
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
					cartItem={true}
				/>

				<div className="cart-quantity-wrapper">
					<CartQuantitiy images={PDP[0].images} />

					<div
						className="cart-quantity__image-gallery-btns"
						style={{ ...btnsGuard }}
					>
						<span
							className="cart-quantity__image-gallery-btn"
							role={'button'}
							onClick={decrement}
							style={{ ...btnGuardLeft }}
						>
							ᐸ
						</span>
						<span
							className="cart-quantity__image-gallery-btn"
							ole={'button'}
							onClick={increment}
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
		productID: state.category.productID,
		products: state.products,
		selectedCurrency: state.currency.selectedCurrency,
		imageCount: state.counter.imageCount,
	};
};

const mapDispatchToProps = { setSelectedProduct, increment, decrement };

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
