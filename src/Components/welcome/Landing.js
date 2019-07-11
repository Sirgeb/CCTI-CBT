import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    textAlign: 'center',
    margin: '60px 50px',
    [theme.breakpoints.only('xs')]: {
      margin: 10
    },
    [theme.breakpoints.between('xs, sm')]: {
      margin: 10
    }
  }
});

class Landing extends React.Component {
  componentWillMount() {
    this.checkAndInitializeCandidatesRecord();
  }

  checkAndInitializeCandidatesRecord() {
    const getCandidateRecord = JSON.parse(localStorage.getItem('candidatesRecord'));

    if (getCandidateRecord === null) {
      localStorage.setItem('candidatesRecord', JSON.stringify([]));
    }

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={0}>
          <Typography variant="headline" component="h3">
            CCTI CBT {new Date().getFullYear()}
            </Typography>
          <Divider className={classes.divider} />
          <Typography variant="body2" component="p">
            I congratulate you for being opportuned to take this test. It is programmed to <br />
            put your knowledge and skill to test.  Please note that you're required to answer all question.  <br />
            The school will take record of your score for future assessment. My advice as Sirgeb's Robot is,  try to get all without failing one... <br />Good luck.
            </Typography>
        </Paper>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
