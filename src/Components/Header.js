import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SubmitDialog from './SubmitDialog';
import Alarm from '@material-ui/icons/Alarm';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 100
  },
  text: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between"
  },
  headline: {
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 18,
      marginLeft: 14
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 22,
      marginLeft: 18
    },
    [theme.breakpoints.only('xl')]: {
      fontSize: 16,
      marginLeft: 22
    },
  }
});

function SimpleAppBar(props) {
  const { classes, examTime, submit } = props;
  return (
    <div className={classes.root}>
      <AppBar color="default">
        <Toolbar className={classes.text}>
          <Typography className={classes.headline} variant="headline" color="inherit">
            CCTI CBT 2018
          </Typography>
          <div style={{ display: "flex" }}>
            <div style={{ margin: "22px 18px", display: "flex" }}>
              <Alarm />
              <Typography color="inherit" >Time: {examTime} </Typography>
            </div>
            <SubmitDialog submit={submit} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
