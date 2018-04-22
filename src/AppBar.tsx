import * as React from 'react';
import {withRouter} from 'react-router';
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

    handleLogout = () => {
        localStorage && localStorage.removeItem('HITCH_JWT');
        this.props.history.push('/login');
    }

    render() {
        const { classes, isLoggedIn } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar className={classes.end}>
                        {!isLoggedIn()
                         ?  <>
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
                            </>
                         : <>
                         <Button style={{textDecoration: 'none', color: 'white'}} onClick={() => this.handleLogout()}>
                             Logout
                         </Button>                    
                         </>
                        }

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const WithRouter = withRouter(withStyles(styles)(HitchAppBar));

export default class AppBarWithRouter extends React.Component<any,any> {
    render() {
        return <WithRouter {...this.props}/>
    }
}