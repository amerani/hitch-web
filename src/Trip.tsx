import * as React from 'react';
import { Card, withStyles, Button } from "material-ui";
import Leg from './Leg';

const styles:any = {
    padding20: {
        padding: '20px'
    }
}

class Trip extends React.Component<any,any> {
    render(){
        const { classes, trip } = this.props;
        return (
            trip 
            && trip.legs.map(
                leg => <Leg key={leg.id} {...leg}/>)
        )
    }
}

export default withStyles(styles)(Trip);