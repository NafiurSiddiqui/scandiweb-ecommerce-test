import { gql } from '@apollo/client';

export const GET_PRODUCTS_BY_CATEGORY = gql`
	query ($category: String!) {
		category(input: { title: $category }) {
			name
			products {
				id
				name
				inStock
				gallery
				description
				category
				brand
				prices {
					amount
					currency {
						label
						symbol
					}
				}
				attributes {
					id
					name
					type
					items {
						id
						displayValue
						value
					}
				}
			}
		}
	}
`;

export const GET_CATEGORIES = gql`
	query {
		categories {
			name
		}
	}
`;

export const GET_CURRENCIES = gql`
	query {
		currencies {
			label
			symbol
		}
	}
`;