import React, { Component } from 'react';
import Header from './components/Layout/Header';
import CategoryList from './components/pages/Category/CategoryList';

export default class App extends Component {
	render() {
		return (
			<>
				<Header />
				<main className="products-display">
					<CategoryList />

					{/* <ProductDescription /> */}
				</main>
			</>
		);
	}
}
