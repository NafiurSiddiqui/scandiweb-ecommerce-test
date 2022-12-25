import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Layout/Header';
import Skeleton from './components/Layout/skeleton';
import Cart from './components/pages/Cart/Cart';
import MiniCart from './components/pages/Cart/MiniCart';
import CategoryList, {
	GET_ALL_CATEGORIES,
} from './components/pages/Category/CategoryList';
import ProductDescription from './components/pages/PDP/ProductDescription';

import { getProductID } from './components/store/categorySlice';
import { setProducts } from './components/store/productsSlice';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			DOMisLoaded: false,
		};
		this.getProductsHandler = this.getProductsHandler.bind(this);

		// this.DOMloadHandler = this.DOMloadHandler.bind(this);
	}

	// componentDidMount() {
	// 	window.addEventListener('load', this.DOMloadHandler);
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener('load', this.DOMloadHandler);
	// }

	// DOMloadHandler() {
	// 	this.setState({ DOMisLoaded: true });
	// }

	componentDidMount(el) {
		this.getProductsHandler(el);
	}
	//Get products
	getProductsHandler(el) {
		this.props.setProducts(el);
	}

	render() {
		let { productIDState, miniCartState } = this.props;
		// console.log();
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
					const products = data.category.products;

					return (
						<>
							{!data ? (
								<Skeleton style={data ? 'display:none' : 'display:block'} />
							) : (
								<section onLoad={this.DOMloadHandler}>
									<Header />
									<main className="products-display">
										{productIDState ? <ProductDescription /> : <CategoryList />}
										{/* {miniCartState ? <MiniCart /> : null} */}
										<MiniCart />
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
		productIDState: state.category.productID,
		miniCartState: state.cart.miniCartIsOpen,
	};
};

const mapDispatchToProps = { getProductID, setProducts };

export default connect(mapStateToProps, mapDispatchToProps)(App);
