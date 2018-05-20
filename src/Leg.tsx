import * as React from 'react';
import { Card, withStyles } from "material-ui";
import Transport from './Transport';
import DateTime from './DateTime';

const styles:any = {
    padding20: {
        padding: '20px'
    }
}

class Leg extends React.Component<any,any> {
    render(){
        const { classes, origin, arrival, transport } = this.props;
        return (
            <Card className={classes.padding20}>
                Origin: {origin.city} <br/>
                Arrival: <DateTime rawDate={arrival}/> <br/>
                <Transport {...transport} /> <br/>
            </Card>
        )
    }
}

export default withStyles(styles)(Leg);