import * as React from 'react';

const Html = (props: any) => {
    return (
        <html>
            <head>
                <title>Hitch</title>
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