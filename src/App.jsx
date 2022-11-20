import './App.css';
import Navbar from './components/Layout/Navbar';

import React, { Component } from 'react';
import CategoryList from './components/pages/CategoryList';
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
