import * as React from 'react';
import { format } from 'date-fns';

export default ({rawDate}:any) => {
    return <span>{format(rawDate, "MMM Do YYYY [at] h[:]mm a")}</span>
}