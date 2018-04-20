import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import ListPage from './ListPage';
import Messages from './Messages';
import SignUpPage from './SignUpPage';
import LogInPage from './LogInPage';
import TripPage from './TripPage';
import AppBar from './AppBar';
import BottomNav from './BottomNav';
import { Grid, withStyles, Paper } from 'material-ui';

const styles:any = (theme:any) => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    pageView_root: {
        display: 'flex',
        justifyContent: 'center'
    },
    pageView: {
        padding: '30px !important',
        height: '100%',
        width: '60%'
    },
    bottomNav: {
        position: 'fixed',
        bottom: 0,
        width: '100%'
    }
})

const App = (props: any) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <AppBar />
                </Grid>
                <Grid item xs={12} className={classes.pageView_root}>
                    <Paper className={classes.pageView}>
                        <Route path="/signup" component={SignUpPage}/>
                        <Route path="/login" component={LogInPage}/>
                        <Route path="/search" component={Search}/>
                        <Route path="/list" component={ListPage}/>
                        <Route path="/messages" component={Messages}/>
                        <Route path="/trip/:id" component={TripPage}/>                
                    </Paper>
                </Grid>
                <Grid item xs={12} className={`${classes.bottomNav} ${classes.flex}`}>
                    <BottomNav />
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(App);