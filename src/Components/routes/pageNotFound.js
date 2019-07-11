import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import image from '../images/background.jpg';
import Button from '@material-ui/core/Button';
import Typing from 'react-typing-animation';
import Hidden from '@material-ui/core/Hidden';
import compose from 'recompose/compose';
import withWidth from '@material-ui/core/withWidth';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    // breakpoints [xs, sm, md, lg, xl]
  },
  typo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 24
  },
  img: {
    [theme.breakpoints.only('md')]: {
      height: "40%",
      width: "65%",
    },
    [theme.breakpoints.only('lg')]: {
      height: "40%",
      width: "75%",
    },
    [theme.breakpoints.only('xl')]: {
      height: "70%",
      width: "85%",
    },
  },
  btn: {
    position: "relative",
    margin: theme.spacing.unit
  },
  ul: {
    margin: 0,
    padding: 0
  },
  li: {
    listStyle: "none"
  }
});

class pageNotFound extends Component {
  state = {
    redirect: false
  }

  handleGoHome = () => {
    localStorage.setItem('candidate', JSON.stringify([]));
    this.setState({
      redirect: true
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.redirect === true ? <Redirect to="/" /> : null}
        <Paper className={classes.root} elevation={0}>
          <Typing >
            <Typography className={classes.typo} variant="headline" component="h3">
              <ul className={classes.ul}>
                <li className={classes.li}> <Typing.Delay ms={1500} /> <strong> 404! </strong> <Typing.Delay ms={1000} />  </li>
                <li className={classes.li}> Page not found. <Typing.Delay ms={1500} /></li>
              </ul>
            </Typography>
          </Typing>
          <Button variant="outlined" className={classes.btn} onClick={this.handleGoHome}> Go Home </Button>
          <center>
            <Hidden smDown>
              <img className={classes.img} src={image} alt="response" />
            </Hidden>
          </center>
        </Paper>
      </div>
    )
  }
}


pageNotFound.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(pageNotFound);
