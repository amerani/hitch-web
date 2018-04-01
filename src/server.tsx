import * as nodeFetch from 'node-fetch';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as express from 'express';
import * as path from 'path'
import { StaticRouter } from 'react-router';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import Html from './Html';
import { API_URL } from './config';

const app = express();

app.use('/static', express.static(path.join(process.cwd(), 'dist/client')));

const initialData = {
    name: 'alek merani'
}

app.use((req, res) => {
    const fetch: any = nodeFetch;
    const client = new ApolloClient({
        ssrMode: true,
        link: new HttpLink({uri: API_URL, fetch}),
        cache: new InMemoryCache()
    })

    ReactDOMServer.renderToNodeStream(
        <ApolloProvider client={client}>
            <StaticRouter location={req.url} context={{}}>
                <Html initialData={JSON.stringify(initialData)}>
                    <App {...initialData} />
                </Html>
            </StaticRouter>
        </ApolloProvider>
    )
    .pipe(res);
})

app.listen(3000, () => {
    console.log('listening on port 3000...');
})