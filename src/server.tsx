import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as express from 'express';
import App from './App';
import Html from './Html';
import * as path from 'path'
import { StaticRouter } from 'react-router';

const app = express();

app.use('/static', express.static(path.join(process.cwd(), 'dist/client')));

const initialData = {
    name: 'alek merani'
}

app.use((req, res) => {
    ReactDOMServer.renderToNodeStream(
        <StaticRouter location={req.url} context={{}}>
            <Html initialData={JSON.stringify(initialData)}>
                <App {...initialData} />
            </Html>
        </StaticRouter>
        
    )
    .pipe(res);
})

app.listen(3000, () => {
    console.log('listening on port 3000...');
})