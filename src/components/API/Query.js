import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { Component } from 'react';

//-------------------

// https://www.apollographql.com/docs/react/api/react/hoc/#propsdata

// https://stackoverflow.com/questions/56200389/how-to-write-hoc-for-react-apollo-query-component-in-typescript

//-----------------------
export const GET_ALL_CATEGORIES = gql`
	query {
		category {
			products {
				category
				id
				name
				inStock
				gallery
				description
				attributes {
					id
					name
					type
					items {
						displayValue
						value
						id
					}
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
				brand
			}
		}
	}
`;

class QueryComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			product: null,
		};
	}

	getProducts(props) {
		this.setState({
			product: props,
		});
	}

	render() {
		return (
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;
					const s = 'hello';
					this.getProducts(s);

					return (
						<>
							{products.map((p) => {
								let product = {
									id: p.id,
									image: p.gallery[0],
									name: p.name,
									prices: p.prices.map((item) => item.amount).slice(0, 1),
									stock: p.inStock,
								};
								return (
									<div key={p.id} data-list={this.state.product}>
										{this.props.children}
									</div>
								);
							})}
						</>
					);
				}}
			</Query>
		);
	}
}
export default QueryComponent;

{
	/* <Query query={GET_ALL_CATEGORIES}>
	{({ error, loading, data, client }) => {
		if (error) return `something went wrong !!! ${error} `;
		if (loading || !data) return 'Loading ... ';
		const products = data.category.products;

		return (
			<>
				{products.map((p) => {
					let product = {
						id: p.id,
						image: p.gallery[0],
						name: p.name,
						prices: p.prices.map((item) => item.amount).slice(0, 1),
						stock: p.inStock,
					};
					return <div data-list={product}>{this.props.children}</div>;
				})}
			</>
		);
	}}
</Query>; */
}
