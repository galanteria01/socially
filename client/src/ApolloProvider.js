import React from 'react';
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import App from './App';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'https://warm-citadel-46719.herokuapp.com/'
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