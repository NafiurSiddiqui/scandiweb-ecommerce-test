import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedProduct } from '../../store/productsSlice';
import DescriptionCard from '../../UI/DescriptionCard';
import CartQuantitiy from './CartQuantitiy';

class CartItem extends Component {
	render() {
		// console.log(this.props);
		const { products } = this.props.products;
		console.log(products);
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
