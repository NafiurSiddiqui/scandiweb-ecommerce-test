import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './sass/main.scss';
import store from './components/store/store';
import { Provider } from 'react-redux';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
});

const rootEl = document.getElementById('root');
const htmlEl = document.documentElement;
const root = ReactDOM.createRoot(rootEl);

const isMiniCartOpen = (miniCartState) => {
	//prevents scroll
	htmlEl.setAttribute(
		'style',
		`overflow: ${miniCartState ? 'hidden' : 'scroll'}`
	);
};

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<App isMiniCartOpen={isMiniCartOpen} />
			</BrowserRouter>
		</ApolloProvider>
	</Provider>
	// </React.StrictMode>
);

/**
 * @strictmode - Note that turning strict mode on implements some weired behaviour and mess up the cartCalculation. This is due to the twice re-render nature of new React.
 */
