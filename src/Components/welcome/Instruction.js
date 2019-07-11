import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import image from '../images/instructor.png';
import Typing from 'react-typing-animation';


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


class Instruction extends React.Component {

  render() {
    const { classes } = this.props;
    const candidate = JSON.parse(localStorage.getItem('candidate'));
    const guest = localStorage.getItem('guest');


    return (
      <div>
        <Paper className={classes.root} elevation={0}>
        <img src={image} alt="instructor" style={{width: "200px", marginBottom: 10}} />
          <Typing>
            <Typography variant="headline" component="h3">
            <Typing.Delay ms={500} />Hi - <Typing.Delay ms={3000} />
              {candidate === null || candidate.length === 0 ? guest : candidate[0].fullName}
              <Typing.Delay ms={500} />
            </Typography>
            <Typography className={classes.text} variant="body2" component="p">
              You have 50 questions <Typing.Delay ms={1000} />
            </Typography>
            <Typography className={classes.text} variant="body2" component="p">
              35 minutes to answer all <Typing.Delay ms={1000} />
            </Typography>
            <Typography className={classes.text} variant="body2" component="p">
              Click on <strong> Start Test</strong> to start
            </Typography>
          </Typing>
        </Paper>
      </div>
    );
  }
}


Instruction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Instruction);
