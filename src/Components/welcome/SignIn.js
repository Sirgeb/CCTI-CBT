import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SignInForm from '../form/SignInForm';
import Candidates from '../Candidates';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    textAlign: 'center',
    margin: '60px 50px'
  },
  text: {
    margin: 10
  }
});


class Register extends React.Component {

  render() {
    const { classes, authenticated } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={0}>
          <Typography variant="headline" component="h3">
            ENTER YOUR DATA
              </Typography>
          <Divider className={classes.divider} />
          <SignInForm
            candidates={Candidates}
            authenticated={authenticated} />
        </Paper>
      </div>
    );

  }

}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
