import { gql } from '@apollo/client';

export const GET_PRODUCTS_BY_CATEGORY = gql`
	query GetProductsByCategory($category: String!) {
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

// const category = 'clothes';

// const GET_PRODUCTS_BY_CATEGORY = gql`
// 	query GetProductsByCategory($category: String!) {
// 		category(input: { title: $category }) {
// 			name
// 			products {
// 				id
// 				name
// 				prices {
// 					amount
// 					currency {
// 						label
// 						symbol
// 					}
// 				}
// 			}
// 		}
// 	}
// `;
