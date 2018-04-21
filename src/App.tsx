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
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { MuiPickersUtilsProvider } from 'material-ui-pickers'; 

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

const App = (props: any) => {
    const {classes} = props;
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={classes.root}>
                <Grid container spacing={16}>
                    <Grid item xs={12} className={classes.topNav}>
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
                    <Grid item xs={12} className={classes.bottomNav}>
                        <BottomNav />
                    </Grid>
                </Grid>
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default withStyles(styles)(App);