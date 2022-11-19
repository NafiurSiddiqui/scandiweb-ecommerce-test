import './App.css';
import Navbar from './components/Layout/Navbar';

import React, { Component } from 'react';

export default class App extends Component {
	render() {
		return (
			<>
				<Navbar />
				<main className="products-display"></main>
			</>
		);
	}
}
