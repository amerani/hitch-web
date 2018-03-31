import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as express from 'express';
import App from './App';
import Html from './Html';
import * as path from 'path'

const app = express();

app.use('/static', express.static(path.join(process.cwd(), 'dist/client')));

const initialData = {
    name: 'World'
}

app.get('/', (req, res) => {
    ReactDOMServer.renderToNodeStream(
        <Html initialData={JSON.stringify(initialData)}>
            <App {...initialData} name="alek" />
        </Html>
    )
    .pipe(res);
})

app.listen(3000, () => {
    console.log('listening on port 3000...');
})