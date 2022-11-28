import React, { Component } from 'react';

export default class CategoryCard extends Component {
	//if currency is selected, showSelectedCurrency || default

	render() {
		return (
			<li className={'category-item'} key={this.props.index}>
				<div className={'category-item__image'}>
					<img src={this.props.image} alt="products" />
				</div>

				<h2>{this.props.heading}</h2>
				<p>
					<span>{this.props.currencySymbol}</span> {this.props.price}
				</p>
			</li>
		);
	}
}
