import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 300,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: 500,
    },
    [theme.breakpoints.only('xl')]: {
      width: 500,
    },
  },
  formControl: {
    margin: theme.spacing.unit,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 300,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: 500,
    },
    [theme.breakpoints.only('xl')]: {
      width: 500,
    },
  }
});


class TextFields extends React.Component {
  state = {
    regNo: '',
    programType: '',
    errMessage: false
  }

  handleChange = data => event => {
    this.setState({
      [data]: event.target.value,
    });
    localStorage.setItem('regNo', event.target.value)
    this.getUser();
  };

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    localStorage.setItem('programType', event.target.value);
    this.getUser();
  };

  getUser = () => {
    const regNo = localStorage.getItem('regNo');
    const programType = localStorage.getItem('programType');

    const student = this.props.candidates.filter((candidate) => {
      return candidate.regNo === regNo && candidate.programType === programType;
    })

    if (student.length === 0) {
      this.setState({
        errMessage: true
      })
      this.props.authenticated("false");
    } else {
      this.setState({
        errMessage: false
      });

      this.props.authenticated("true");
    }

    localStorage.setItem('candidate', JSON.stringify(student));
  }

  render() {
    const { classes } = this.props;
    const regNo = localStorage.getItem('regNo');
    const programType = localStorage.getItem('programType');

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="regNo"
            label="Reg No"
            className={classes.textField}
            value={regNo}
            onChange={this.handleChange('regNo')}
            margin="normal"
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-program">Program Type</InputLabel>
            <Select
              value={programType}
              onChange={this.handleSelectChange}
              inputProps={{
                name: 'programType',
                id: 'select-program',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="EXECUTIVE">EXECUTIVE</MenuItem>
              <MenuItem value="REGULAR">REGULAR</MenuItem>
            </Select>
          </FormControl>
        </form >
        {this.state.errMessage === true ? <div> Please enter your data correctly </div> : null}
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);