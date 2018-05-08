import * as React from 'react';
import { withStyles, Icon } from 'material-ui';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import { withRouter } from 'react-router';

const styles:any = {
  root: {
    flexGrow: 1,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 'auto'
  },
  icon: {
    fontSize: '48px'
  }
};

class BottomNav extends React.Component<any, any> {
  state = {
    value: 0,
  };

  handleChange = (event:any, value:any) => {
    this.setState({ value });
    this.props.history.push(`/${value}`)
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        showLabels
        onChange={this.handleChange}
        className={classes.root}
      >
        <BottomNavigationAction label="Search" value="search" 
            icon={<Icon className={classes.icon}>search</Icon>} />
        <BottomNavigationAction label="List" value="list" 
            icon={<Icon className={classes.icon}>add</Icon>} />
        <BottomNavigationAction label="Messages" value="messages" 
            icon={<Icon className={classes.icon}>chat</Icon>} />
        <BottomNavigationAction label="MyTrips" value="myTrips" 
            icon={<Icon className={classes.icon}>map</Icon>} />            
      </BottomNavigation>
    );
  }
}

export default withRouter(withStyles(styles)(BottomNav));