import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Skeleton from './components/Layout/skeleton';
import Cart from './components/pages/Cart/Cart';
import MiniCart from './components/pages/Cart/MiniCart';
import Products from './components/pages/Products/Products';
import { GET_ALL_CATEGORIES } from './components/Utilities/query';
import ProductDescription from './components/pages/PDP/ProductDescription';
import { getProductID } from './components/store/productsSlice';
import DisplayMessage from './components/Utilities/DisplayMessage';

class App extends Component {
	componentDidUpdate(prevProps) {
		if (prevProps.miniCartIsOpen !== this.props.miniCartIsOpen) {
			this.props.isMiniCartOpen(this.props.miniCartIsOpen);
		}
	}

	render() {
		let { miniCartIsOpen, rootModal } = this.props;

		return (
			<Query query={GET_ALL_CATEGORIES} variables={{ category: 'all' }}>
				{({ error, loading, data }) => {
					if (error) return <DisplayMessage error={error} />;

					if (loading || !data) {
						return <Skeleton />;
					}

					return (
						<>
							<section>
								<Header />
								{miniCartIsOpen ? createPortal(<MiniCart />, rootModal) : null}
								<main
									className="products-display"
									tabIndex={miniCartIsOpen ? '-1' : '0'}
								>
									<Routes>
										<Route path="*" element={<Products />} />
										<Route
											path="/ProductDescription"
											element={<ProductDescription />}
										/>
										<Route path="/Cart" element={<Cart />} />
									</Routes>
								</main>
							</section>
						</>
					);
				}}
			</Query>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productID: state.products.productID,
		miniCartIsOpen: state.cart.miniCartIsOpen,
	};
};

const mapDispatchToProps = { getProductID };

export default connect(mapStateToProps, mapDispatchToProps)(App);
