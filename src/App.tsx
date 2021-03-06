import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { Grid, withStyles, Paper } from 'material-ui';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';

const styles:any = (theme:any) => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    topNav: {
        height: '10vh'
    },
    pageView_root: {
        display: 'flex',
        justifyContent: 'center'
    },
    pageView: {
        padding: '30px !important',
        minHeight: '70vh',
        width: '60%'
    },
    bottomNav: {
        height: '10vh'
    }
})
const Loading = () => <p>Loading</p>;

const Search = Loadable({
    loader: () => import(/* webpackChunkName: "Search" */ './Search'),
    loading: Loading, delay: 300
});

const ListPage = Loadable({
    loader: () => import(/* webpackChunkName: "ListPage" */ './ListPage'),
    loading: Loading, delay: 300
});

const Messages = Loadable({
    loader: () => import(/* webpackChunkName: "Messages" */ './Messages'),
    loading: Loading, delay: 300
});

const SignUpPage = Loadable({
    loader: () => import(/* webpackChunkName: "SignUpPage" */ './SignUpPage'),
    loading: Loading, delay: 300
});

const LogInPage = Loadable({
    loader: () => import(/* webpackChunkName: "LogInPage" */ './LogInPage'),
    loading: Loading, delay: 300
});

const TripPage = Loadable({
    loader: () => import(/* webpackChunkName: "TripPage" */ './TripPage'),
    loading: Loading, delay: 300
});

const AppBar = Loadable({
    loader: () => import(/* webpackChunkName: "AppBar" */ './AppBar'),
    loading: Loading, delay: 300
});

const BottomNav = Loadable({
    loader: () => import(/* webpackChunkName: "BottomNav" */ './BottomNav'),
    loading: Loading, delay: 300
});

const MyTrips = Loadable({
    loader: () => import(/* webpackChunkName: "MyTrips" */ './MyTrips'),
    loading: Loading, delay: 300
});

const App = (props: any) => {
    const {classes, isLoggedIn} = props;
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.root}>
            <Grid container spacing={16}>
                <Grid item xs={12} className={classes.topNav}>
                    <AppBar isLoggedIn={isLoggedIn}/>
                </Grid>
                <Grid item xs={12} className={classes.pageView_root}>
                    <Paper className={classes.pageView}>
                        <Route path="/signup" component={SignUpPage}/>
                        <Route path="/login" component={LogInPage}/>
                        <Route path="/search" component={Search}/>
                        <Route path="/list" component={ListPage}/>
                        <Route path="/messages" component={Messages}/>
                        <Route path="/myTrips" component={MyTrips}/>
                        <Route path="/trip/:id" component={TripPage}/>                
                    </Paper>
                </Grid>
                <Grid item xs={12} className={classes.bottomNav}>
                    <BottomNav isLoggedIn={isLoggedIn}/>
                </Grid>
            </Grid>
        </div>
        </MuiPickersUtilsProvider>        
    )
}

export default withStyles(styles)(App);