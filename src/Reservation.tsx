import * as React from 'react';
import { Card, withStyles } from "material-ui";

const styles:any = {
    padding20: {
        padding: '20px'
    }
}

class Reservation extends React.Component<any,any> {
    render(){
        const { classes, type } = this.props;
        return (
            <Card className={classes.padding20}>
                Reservation Type {type}
            </Card>
        )
    }
}

export default withStyles(styles)(Reservation);