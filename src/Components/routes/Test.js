import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import Questions from '../Questions';
import Objective from '../Objective';
import Header from '../Header';
import { Redirect } from 'react-router-dom';


const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 5,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    overflow: 'hidden',
    width: '100%',
  },
  mobileStepper: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
});

class Test extends React.Component {
  state = {
    activeStep: 0,
    examTime: undefined,
    submit: false,
    timeOut: false
  };

  componentDidMount() {
    this.setTime();
    localStorage.setItem('questionNo', JSON.stringify([]));
    localStorage.setItem('candidateScore', String(0));
  }

  CountDown() {
    if (this.state.examTime === 1000) {
      this.handleTimeOut();
    } else if (this.state.examTime > 0) {
      let countDown = this.state.examTime - 1000;
      this.setState({ examTime: countDown })
    }
  }

  leadingZero(num) {
    if (num < 10) {
      return '0' + num;
    }

    return num;
  }

  remainingTime() {
    let seconds = this.leadingZero(Math.floor((this.state.examTime / 1000) % 60));
    let minutes = this.leadingZero(Math.floor((this.state.examTime / 1000 / 60) % 60));

    return `${minutes}:${seconds}`;
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  response = (quesNo) => {
    quesNo = String(quesNo);
    const questionNo = JSON.parse(localStorage.getItem('questionNo'));
    const result = questionNo.includes(quesNo);

    if (result === false) {
      localStorage.setItem('questionNo', JSON.stringify(questionNo.concat(quesNo)));
    }

    const questionNos = JSON.parse(localStorage.getItem('questionNo'));
    localStorage.setItem('candidateScore', String(questionNos.length));
  };

  checkQuestionNo = (quesNo) => {
    quesNo = String(quesNo);
    const questionNo = JSON.parse(localStorage.getItem('questionNo'));
    const result = questionNo.includes(quesNo);

    if (result === true) {
      const questionNos = questionNo.filter((questionNumber) => {
        return questionNumber !== quesNo;
      });

      localStorage.setItem('questionNo', JSON.stringify(questionNos));
      localStorage.setItem('candidateScore', String(questionNos.length));
    }
  }

  setTime = () => {
    const examTime = Date.parse(new Date()) + (1000 * 60 * 35) - Date.parse(new Date());
    this.setState({ examTime });
    this.timer = setInterval(() => this.CountDown(), 1000);
    this.remainingTime();
  }

  handleSubmit = () => {
    clearInterval(this.timer);
    this.setState({
      submit: true
    })
  }

  handleTimeOut = () => {
    clearInterval(this.timer);
    this.setState({
      timeOut: true
    })
  }


  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = Questions.length;
    const authenticated = localStorage.getItem('authenticated');
    const guest = localStorage.getItem('guest');

    return (
      <div className={classes.root}>
        {!!authenticated || !!guest ?
          <div id="test">
            {this.state.submit === true ? <Redirect to="/submit-response" /> : null}
            {this.state.timeOut === true ? <Redirect to="/timeout" /> : null}

            <Header examTime={this.remainingTime()} submit={this.handleSubmit} />
            <Paper square elevation={0} className={classes.header}>
              <Typography>{Questions[activeStep].id}. {Questions[activeStep].label}</Typography>
            </Paper>

            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents
            >
              {Questions.map(question => (
                <Objective
                  objective={question.obj}
                  key={question.id}
                  response={(quesNo) => this.response(quesNo)}
                  checkQuestionNo={(quesNo) => this.checkQuestionNo(quesNo)} />
              ))}

            </SwipeableViews>

            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="progress"
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
            </Button>
              }
            />
          </div>
          : <Redirect to="/not-found" />}

      </div>
    );
  }
}

Test.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Test);

