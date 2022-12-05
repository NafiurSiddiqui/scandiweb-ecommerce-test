import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import CategoryList from './components/pages/Category/CategoryList';
import ProductDescription from './components/pages/PDP/ProductDescription';
import { getProductID } from './components/store/categorySlice';

class App extends Component {
	render() {
		let { productID } = this.props.protductIDState;
		console.log(productID);
		return (
			<>
				<Header />
				<main className="products-display">
					{productID ? <ProductDescription /> : <CategoryList />}
				</main>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		protductIDState: state.category,
	};
};

const mapDispatchToProps = { getProductID };

export default connect(mapStateToProps, mapDispatchToProps)(App);
