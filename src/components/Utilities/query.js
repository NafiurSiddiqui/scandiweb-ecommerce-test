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

export const GET_PRODUCTS_BY_ID = gql`
	query ($productID: String!) {
		product(id: $productID) {
			name
			inStock
			gallery
			description
			category
			attributes {
				id
				name
				type
				items {
					displayValue
					value
					id
					__typename
				}
			}
			prices {
				currency {
					label
					symbol
				}
				amount
				__typename
			}
			brand
		}
	}
`;

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
