import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('app'));