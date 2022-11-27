import {
	ApolloClient,
	ApolloProvider,
	gql,
	InMemoryCache,
} from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './sass/main.scss';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
});

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
			<Query query={GET_ALL_CATEGORIES}>
				{({ error, loading, data, client }) => {
					if (error) return `something went wrong !!! ${error} `;
					// console.log(client);
					if (loading || !data) return 'Loading ... ';
					const products = data.category.products;
					console.log(products);
					return products.map((p, index) => <div key={index}>{p.brand}</div>);
				}}
			</Query>
		</ApolloProvider>
	</React.StrictMode>
);
