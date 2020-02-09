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
      width: "80%",
    },
    [theme.breakpoints.only('lg')]: {
      height: "40%",
      width: "65%",
    },
    [theme.breakpoints.only('xl')]: {
      height: "70%",
      width: "70%",
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

class SubmitResponse extends Component {
  state = {
    candidateData: undefined,
    score: undefined,
    redirect: false
  }

  componentWillMount() {
    this.getScore();
    this.getCandidateData();
    localStorage.removeItem('authenticated');
  }

  componentDidMount() {
    this.recordCandidate(this.state.score, this.state.candidateData);
  }

  getScore() {
    const score = localStorage.getItem('candidateScore');
    this.setState({
      score
    });
  }

  getCandidateData() {
    const candidateData = JSON.parse(localStorage.getItem('candidate'));
    this.setState({
      candidateData
    });
  }

  getCandidatesRecord() {
    try {
      const candidatesRecord = JSON.parse(localStorage.getItem('candidatesRecord'));
      if (candidatesRecord.length !== 0) {
        return candidatesRecord;
      } else {
        return []
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleGoHome = () => {
    localStorage.setItem('candidate', JSON.stringify([]));
    this.setState({
      redirect: true
    })
  }

  recordCandidate(score, candidateData) {
    let candidatesRecord = this.getCandidatesRecord();
    let candidateRecordNo;

    const guest = localStorage.getItem('guest');

    if (candidatesRecord === [] || null || undefined) {
      candidateRecordNo = 0
    } else {
      candidateRecordNo = candidatesRecord.length + 1;
    }

    if (!!guest) {
      // do nothing... its a guest
    } else {
      let candidateRecord = {
        score,
        candidateData,
        candidateRecordNo,
        used: "Timed Up"
      }

      candidatesRecord.push(candidateRecord);
      localStorage.setItem('candidatesRecord', JSON.stringify(candidatesRecord));
    }

  }

  componentWillUnmount() {
    localStorage.setItem('questionNo', JSON.stringify([]));
    localStorage.setItem('candidateScore', String(0));
    localStorage.setItem('regNo', '');
    localStorage.setItem('programType', '');
    localStorage.setItem('questionNo', JSON.stringify([]));
    localStorage.setItem('candidate', JSON.stringify([]));
    localStorage.removeItem('guest');
    localStorage.setItem('guestScore', String(0));
  }

  render() {
    const { classes } = this.props;
    const guest = localStorage.getItem('guest');
    const candidate = JSON.parse(localStorage.getItem('candidate'));
    const guestScore = localStorage.getItem('candidateScore');

    return (
      <div>
        {candidate !== [] ? <div id="submit-response">
          {candidate !== [] || !!guest ?
            <Paper className={classes.root} elevation={0}>
              {this.state.redirect === true ? <Redirect to="/" /> : null}
              {!!guest ?
              <Typing >
              <Typography className={classes.typo} variant="headline" component="h3">
                <ul className={classes.ul}>
                  <li className={classes.li}> <Typing.Delay ms={1500} />Time Up! <Typing.Delay ms={1000} /> <strong> guest  </strong> <Typing.Delay ms={500} /> </li>
                  <li className={classes.li}> Your score is {guestScore} <Typing.Delay ms={1500} /></li>
                </ul>
              </Typography>
              </Typing> :
              <Typing >
              <Typography className={classes.typo} variant="headline" component="h3">
                <ul className={classes.ul}>
                  <li className={classes.li}> <Typing.Delay ms={1500} />Time Up! <Typing.Delay ms={1000} /> <strong> {this.state.candidateData[0].fullName}  </strong> <Typing.Delay ms={500} /> </li>
                  <li className={classes.li}> Sirgeb's Robot has recorded your score <Typing.Delay ms={1500} /></li>
                  <li className={classes.li}>  You will get your score next year <Typing.Delay ms={1500} /> </li>
                  <li className={classes.li}> </li>
                  <li className={classes.li}> Sorry I made a mistake... <Typing.Delay ms={1500} /> </li>
                  <li className={classes.li}> It will be out by tomorrow or next.</li>
                </ul>
              </Typography>
              </Typing>
              }
              <Button variant="outlined" className={classes.btn} onClick={this.handleGoHome}> Go Home </Button>
              <center>
                <Hidden smDown>
                  <img className={classes.img} src={image} alt="response" />
                </Hidden>
              </center>
            </Paper>
            : <Redirect to="/not-found" />}
        </div> : null}
      </div>
    )
  }
}


SubmitResponse.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(SubmitResponse);
