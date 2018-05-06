import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { API_URL, WS_URL } from './config';
import App from './App';

const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

const authLink = new ApolloLink((op, next) => {
    if(localStorage['HITCH_JWT']) {
        op.setContext({
            headers: {
                authorization: `Bearer ${localStorage['HITCH_JWT']}`
            }
        })
    }
    return next(op);
})

const httpLink = new HttpLink({ uri: API_URL });

const wsClient = new SubscriptionClient(WS_URL, {
    reconnect: true
});

const wsLink:any = new WebSocketLink(wsClient);

const link = ApolloLink.split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation }:any = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

const client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link: ApolloLink.from([authLink, link]),
    cache: new InMemoryCache().restore(initialData),
    connectToDevTools: true
})

const removeServerSideStyle = () => {
    const jssStyles = document.getElementById('jss-server-side');
    if(jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
    }
}

const isLoggedIn = () => localStorage['HITCH_JWT'] != null;

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App {...initialData} isLoggedIn={isLoggedIn} />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('app'),
    removeServerSideStyle);