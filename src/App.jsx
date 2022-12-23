import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Layout/Header';
import Skeleton from './components/Layout/skeleton';
import Cart from './components/pages/Cart/Cart';
import MiniCart from './components/pages/Cart/MiniCart';
import CategoryList from './components/pages/Category/CategoryList';
import ProductDescription from './components/pages/PDP/ProductDescription';

import { getProductID } from './components/store/categorySlice';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			DOMisLoaded: false,
		};

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

	render() {
		let { productIDState, miniCartState } = this.props;
		// console.log();
		return (
			<>
				{!this.state.DOMisLoaded ? (
					<Skeleton
						style={this.state.DOMisLoaded ? 'display:none' : 'display:block'}
					/>
				) : (
					<section onLoad={this.DOMloadHandler}>
						<Header />
						<main className="products-display">
							{productIDState ? <ProductDescription /> : <CategoryList />}
							{miniCartState ? <MiniCart /> : null}
						</main>
					</section>
				)}
			</>
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

const mapDispatchToProps = { getProductID };

export default connect(mapStateToProps, mapDispatchToProps)(App);
