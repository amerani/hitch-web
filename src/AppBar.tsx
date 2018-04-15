import * as React from 'react';
import {AppBar, Toolbar, Button, withStyles} from 'material-ui';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1
    }
}

class HitchAppBar extends React.Component<any, any> {
    constructor(props:any){
        super(props)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Button><Link to="/signup">SignUp</Link></Button>
                        <Button><Link to="/login">LogIn</Link></Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(HitchAppBar)