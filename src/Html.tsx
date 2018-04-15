import * as React from 'react';

const Html = (props: any) => {
    return (
        <html>
            <head>
                <title>Hitch</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />  
            </head>
            <body>
                <div id="app">{props.children}</div>
                <script id="initial-data" type="text/plain" data-json={props.initialData}></script>
                <script src="/static/bundle.js"></script>
            </body>
        </html>
    )
}

export default Html;