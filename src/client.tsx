import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

const client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link: new HttpLink({uri: 'http://localhost:8080'}),
    cache: new InMemoryCache().restore(initialData),
    connectToDevTools: true
})

ReactDOM.hydrate(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App {...initialData}/>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('app'));