import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Layout/Header';
import Skeleton from './components/Layout/skeleton';
import CategoryList from './components/pages/Category/CategoryList';
import ProductDescription from './components/pages/PDP/ProductDescription';
import { getProductID } from './components/store/categorySlice';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			DOMisLoaded: false,
		};

		this.DOMHandler = this.DOMHandler.bind(this);
	}

	componentDidMount() {
		window.addEventListener('load', this.DOMHandler);
	}

	componentWillUnmount() {
		window.removeEventListener('load', this.DOMHandler);
	}

	DOMHandler() {
		this.setState({ DOMisLoaded: true });
	}

	render() {
		let { productID } = this.props.protductIDState;
		console.log(productID);
		return (
			<>
				{!this.state.DOMisLoaded ? (
					<Skeleton
						style={this.state.DOMisLoaded ? 'display:none' : 'display:block'}
					/>
				) : (
					<section onLoad={this.DOMHandler}>
						<Header />
						<main className="products-display">
							{productID ? <ProductDescription /> : <CategoryList />}
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
		protductIDState: state.category,
	};
};

const mapDispatchToProps = { getProductID };

export default connect(mapStateToProps, mapDispatchToProps)(App);
