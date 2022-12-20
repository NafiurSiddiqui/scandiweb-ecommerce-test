import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './sass/main.scss';
import store from './components/store/store';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/Error/ErrorBoundary';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<ApolloProvider client={client}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ApolloProvider>
			</Provider>
		</ErrorBoundary>
	</React.StrictMode>
);
