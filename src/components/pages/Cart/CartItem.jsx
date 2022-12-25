import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedProduct } from '../../store/productsSlice';
import DescriptionCard from '../../UI/DescriptionCard';
import CartQuantitiy from './CartQuantitiy';

class CartItem extends Component {
	render() {
		// console.log(this.props);
		const { products } = this.props.products;
		//filter out the cartItem
		// getting the right data
		// let filteredProduct = products.filter((item) => item.id === productID);
		let filteredProduct = products.filter(
			(item) => item.id === 'huarache-x-stussy-le'
		);

		console.log(filteredProduct);

		return (
			<li className="cart-items__item">
				<DescriptionCard />
				<CartQuantitiy />
			</li>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productID: state.category.productID,
		products: state.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = { setSelectedProduct };

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
