import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../../store/productsSlice';
import CategoryCard from './CategoryCard';
import { GET_ALL_CATEGORIES } from './CategoryList';

/**
 * @TASK -
 * Product brand and name are shown at the same line

 */

class CategoryAll extends Component {
	constructor(props) {
		super();
	}

	render() {
		const { selectedCurrency } = this.props;
		const { products } = this.props.products;

		const currencies = products?.map((item) =>
			item.prices.map((item) => {
				return {
					currency: item.currency.label,
					symbol: item.currency.symbol,
					amount: item.amount,
				};
			})
		);

		const matchedUserPrice = currencies?.map((item) =>
			item.find((el) => {
				if (selectedCurrency !== null) {
					return el.currency === selectedCurrency.currency;
				} else {
					return el.currency === 'USD';
				}
			})
		);

		return (
			<>
				<div>
					<h1 className={'category-title'}>All</h1>
				</div>

				<ul className={'category-items'}>
					{products?.map((p, i) => {
						let product = {
							id: p.id,
							image: p.gallery[0],
							name: p.name,
							prices: matchedUserPrice[i]?.amount,

							stock: p.inStock,
						};

						return (
							<CategoryCard
								key={product.id}
								image={product.image}
								heading={product.name}
								price={product.prices}
								inStock={product.stock}
								productID={p.id}
								currencySymbol={selectedCurrency?.symbol}
							/>
						);
					})}
				</ul>
			</>
		);
	}
}

export const mapStateToProps = (state) => {
	return {
		productIDState: state.category,
		products: state.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

export const mapDispatchToProps = { setProducts };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAll);
