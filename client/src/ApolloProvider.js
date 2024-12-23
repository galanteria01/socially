import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import App from './App';
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: 'http://localhost:5001/'
})

const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),

})

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)