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

const root = ReactDOM.createRoot(rootEl);

const isMiniCartOpen = (miniCartState) => {
	rootEl.style.overflow = miniCartState ? 'Hidden' : 'scroll';
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
