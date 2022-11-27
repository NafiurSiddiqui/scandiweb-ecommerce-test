import React, { Component } from 'react';
import Navbar from './components/Layout/Navbar';
import CategoryList from './components/pages/Category/CategoryList';
import ProductDescription from './components/pages/ProductDescription';

export default class App extends Component {
	render() {
		return (
			<>
				<Navbar />
				<main className="products-display">
					<CategoryList />
					<ProductDescription />
				</main>
			</>
		);
	}
}
