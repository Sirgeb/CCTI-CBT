import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ReactTooltip from 'react-tooltip'

const styles = {
  root: { 
    clear: 'both',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  span: {
    textDecoration: 'underline'
  }
};

function Footer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography gutterBottom>
        &copy; Copyright {new Date().getFullYear()} - CCTI <br/>
           Designed and developed by <span className={classes.span} data-tip="Contact Phone: +2348060230771, Email: chybesta@gmail.com"> Sirgeb </span>
      </Typography>
      <ReactTooltip place="right" type="dark" effect="float"/>
    </div>
  );
}

export default withStyles(styles)(Footer);
