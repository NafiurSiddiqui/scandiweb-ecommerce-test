import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayHeader from '../../Layout/DisplayHeader';
import { setProducts } from '../../store/productsSlice';
import { userCurrency } from '../../Utilities/currency';
import CategoryCard from './CategoryCard';

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

		const matchedUserPrice = userCurrency(products, selectedCurrency);

		return (
			<>
				<DisplayHeader>All</DisplayHeader>

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