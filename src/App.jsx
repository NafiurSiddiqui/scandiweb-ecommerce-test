import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Layout/Header';
import Skeleton from './components/Layout/skeleton';
import Cart from './components/pages/Cart/Cart';
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
		let { productID } = this.props.productIDState;

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
							{productID ? <ProductDescription /> : <CategoryList />}
							{/* <Cart /> */}
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
		productIDState: state.category,
	};
};

const mapDispatchToProps = { getProductID };

export default connect(mapStateToProps, mapDispatchToProps)(App);
