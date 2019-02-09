import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
    marginLeft: 50
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    [theme.breakpoints.only('xs')]: {
      margin: 0
    },
    [theme.breakpoints.between('xs, sm')]: {
      margin: 0
    }
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: ''
  };

  handleChange = (event, ans, quesNo) => {
    this.setState({ value: event });

    if (event === ans) {
      this.props.response(quesNo);
    } else {
      this.props.checkQuestionNo(quesNo);
    }
  }

  render() {
    const { classes, objective } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.value}
            onChange={(e) => this.handleChange(e.target.value, objective.ans, objective.ques)}
          >
            <FormControlLabel value={objective.opt1} control={<Radio />} label={objective.opt1} />
            <FormControlLabel value={objective.opt2} control={<Radio />} label={objective.opt2} />
            {objective.opt3 === undefined ? null
              :
              <FormControlLabel value={objective.opt3} control={<Radio />} label={objective.opt3} />}
            {objective.opt4 === undefined ? null :
              <FormControlLabel value={objective.opt4} control={<Radio />} label={objective.opt4}
              />}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
