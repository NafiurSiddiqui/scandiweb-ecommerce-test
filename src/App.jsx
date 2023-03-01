import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Skeleton from './components/Layout/skeleton';
import Cart from './components/pages/Cart/Cart';
import MiniCart from './components/pages/Cart/MiniCart';
import Categories from './components/pages/Category/Categories';
import CategoryList, {
	GET_ALL_CATEGORIES,
} from './components/pages/Category/CategoryList';
import CategoryClothes from './components/pages/Category/Clothes';
import CategoryTech from './components/pages/Category/Tech';
import ProductDescription from './components/pages/PDP/ProductDescription';
import { getProductID, setProducts } from './components/store/productsSlice';
import DisplayMessage from './components/Utilities/DisplayMessage';

class App extends Component {
	componentDidUpdate(prevProps) {
		if (prevProps.miniCartIsOpen !== this.props.miniCartIsOpen) {
			this.props.isMiniCartOpen(this.props.miniCartIsOpen);
		}
	}

	//Get products
	// getProductsHandler(el) {
	// 	this.props.setProducts(el);
	// }

	render() {
		let { miniCartIsOpen, rootModal } = this.props;

		return (
			<Query
				query={GET_ALL_CATEGORIES}
				// onCompleted={(data) => this.getProductsHandler(data.category.products)}
				variables={{ category: 'all' }}
			>
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
										{/* <Route path="*" element={<CategoryList />} /> */}
										<Route path="*" element={<Categories />} />

										<Route
											path="/ProductDescription"
											element={<ProductDescription />}
										/>
										{/* <Route path="/tech" element={<CategoryTech />} />
										<Route path="/clothes" element={<CategoryClothes />} /> */}
										<Route path="/Cart" element={<Cart />} />
									</Routes>

									{/* <Categories /> */}
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

const mapDispatchToProps = { getProductID, setProducts };

export default connect(mapStateToProps, mapDispatchToProps)(App);
