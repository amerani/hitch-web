import * as React from 'react';
import { Card, withStyles } from "material-ui";
import Reservation from './Reservation';

const styles:any = {
    padding20: {
        padding: '20px'
    }
}

class Transport extends React.Component<any,any> {
    render(){
        const { classes, type, reservations } = this.props;
        return (
            <Card className={classes.padding20}>
                Transport Type {type}
                {reservations && reservations.map(r => <Reservation key={r.id} {...r} />)}
            </Card>
        )
    }
}

export default withStyles(styles)(Transport);