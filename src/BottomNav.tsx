import * as React from 'react';
import { withStyles, Icon } from 'material-ui';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import { withRouter } from 'react-router';

const styles = {
  root: {
    flexGrow: 1,
  },
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
        <BottomNavigationAction label="Search" value="search" icon={<Icon>search</Icon>} />
        <BottomNavigationAction label="List" value="list" icon={<Icon>add</Icon>} />
        <BottomNavigationAction label="Messages" value="messages" icon={<Icon>chat</Icon>} />
      </BottomNavigation>
    );
  }
}

export default withRouter(withStyles(styles)(BottomNav));