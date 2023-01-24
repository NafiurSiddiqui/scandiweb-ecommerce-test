import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Router, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Skeleton from './components/Layout/skeleton';
import Cart from './components/pages/Cart/Cart';
import MiniCart from './components/pages/Cart/MiniCart';
import CategoryList, {
	GET_ALL_CATEGORIES,
} from './components/pages/Category/CategoryList';
import ProductDescription from './components/pages/PDP/ProductDescription';

import { getProductID, setProducts } from './components/store/productsSlice';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			DOMisLoaded: false,
		};
		this.getProductsHandler = this.getProductsHandler.bind(this);

		this.DOMloadHandler = this.DOMloadHandler.bind(this);
	}

	componentDidMount() {
		window.addEventListener('load', this.DOMloadHandler);
	}

	componentWillUnmount() {
		window.removeEventListener('load', this.DOMloadHandler);
	}

	DOMloadHandler() {
		this.setState({ DOMisLoaded: true });
	}

	//Get products
	getProductsHandler(el) {
		this.props.setProducts(el);
	}

	render() {
		let { productID, miniCartIsOpen } = this.props;
		let { DOMisLoaded } = this.state;

		return (
			<Query
				query={GET_ALL_CATEGORIES}
				onCompleted={(data) => this.getProductsHandler(data.category.products)}
			>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) {
						return 'Loading ... ';
					}

					return (
						<>
							{!DOMisLoaded ? (
								<Skeleton
									style={DOMisLoaded ? 'display:none' : 'display:block'}
								/>
							) : (
								<section onLoad={this.DOMloadHandler}>
									<Header />
									<main className="products-display">
										{miniCartIsOpen ? <MiniCart /> : null}

										<Routes>
											<Route path="*" element={<CategoryList />} />
											<Route
												path="/ProductDescription"
												element={<ProductDescription />}
											/>
											<Route path="/Cart" element={<Cart />} />
										</Routes>
									</main>
								</section>
							)}
						</>
					);
				}}
			</Query>
		);
	}
	P;
}

const mapStateToProps = (state) => {
	return {
		productID: state.products.productID,
		miniCartIsOpen: state.cart.miniCartIsOpen,
	};
};

const mapDispatchToProps = { getProductID, setProducts };

export default connect(mapStateToProps, mapDispatchToProps)(App);
