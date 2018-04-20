import * as React from 'react';
import {AppBar, Toolbar, Button, withStyles} from 'material-ui';
import { Link } from 'react-router-dom';

const styles: any = {
    root: {
        flexGrow: 1,
    },
    end: {
        justifyContent: 'flex-end'
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
                    <Toolbar className={classes.end}>
                        <Button>
                            <Link style={{textDecoration: 'none', color: 'white'}} to="/signup">
                                SignUp
                            </Link>
                        </Button>
                        <Button>
                            <Link style={{textDecoration: 'none', color: 'white'}} to="/login">
                                LogIn
                            </Link>
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(HitchAppBar)