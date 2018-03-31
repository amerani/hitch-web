import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import App from './App';
import Html from './Html';

const app = express();

app.use('/static', express.static('public'));

const initialData = {
    name: 'World'
}

app.get('/', (req, res) => {
    ReactDOMServer.renderToNodeStream(
        <Html initialData={JSON.stringify(initialData)}>
            <App {...initialData} name="world" />
        </Html>
    )
    .pipe(res);
})

app.listen(3000, () => {
    console.log('listening on port 3000...');
})