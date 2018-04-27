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
                <style id="jss-server-side">{props.sheets.toString()}</style>
                <script id="initial-data" type="text/plain" data-json={props.initialData}></script>
                <script type="text/javascript" src="/static/manifest.bundle.js"></script>
                <script type="text/javascript" src="/static/commons.chunk.js"></script>
                <script type="text/javascript" src="/static/react.chunk.js"></script>
                <script type="text/javascript" src="/static/vendors.chunk.js"></script>
                <script type="text/javascript" src="/static/app.chunk.js"></script>
            </body>
        </html>
    )
}

export default Html;