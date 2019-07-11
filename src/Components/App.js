import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Landing from './welcome/Landing';
import Instruction from './welcome/Instruction';
import SignIn from './welcome/SignIn';
import { Redirect } from 'react-router-dom';
import './App.css';

const styles = theme => ({
  root: {
    width: '100%'
  },
  subContainer: {
    marginBottom: 30
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  buttom: {
    flexDirection: "row",
    justifyContent: "center"
  },
  landing: {
    marginBottom: 30
  },
  signIn: {
    marginBottom: 30
  },
  instruct: {
    marginBottom: 30
  }
}); 

function getSteps() {
  return ['Welcome', 'Sign-in', 'Information'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Please! ensure you read the information above, Before clicking on Next.';
    case 1:
      return 'By clicking on next, You validate the information above';
    default:
      return '';
  }
}

class App extends React.Component {
  state = {
    activeStep: 0,
    hasCandidate: false,
    authenticated: false
  };

  componentWillMount() {
    localStorage.setItem('regNo', '');
    localStorage.setItem('programType', '');
  }

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleGuestSignIn = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
    localStorage.setItem('guest', 'guest');
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  authenticated = (response) => {
    if (response === "true") {
      this.setState({
        authenticated: true
      })
      localStorage.setItem('authenticated', 'true');

    } else if (response === "false") {

      this.setState({
        authenticated: false
      })
      localStorage.removeItem('authenticated');
    }
  }


  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        {this.state.hasCandidate === true ? <Redirect to="/test" /> : null}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className={classes.subContainer}>
          {this.state.activeStep === 0 ? (
            <div className={classes.landing}>
              <Landing />
              <center>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
              </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Start Test' : 'Next'}
                  </Button>
                </div>
              </center>
            </div>
          ) : this.state.activeStep === 1 ?
              <div className={classes.signIn}>
                <SignIn authenticated={(response) => this.authenticated(response)} />
                {this.state.authenticated === true ? <center>
                  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                    >
                      Back
                </Button>

                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                      {activeStep === steps.length - 1 ? 'Start Test' : 'Next'}
                    </Button>

                  </div>
                </center> : null}
                {this.state.authenticated === true ? null : <center>
                  <Typography variant="subheading" gutterBottom>
                    Or
                  </Typography>
                  <Button disabled title="Sorry you aint a guest" variant="contained" color="primary" onClick={this.handleGuestSignIn}>
                    {activeStep === steps.length - 1 ? 'Start Test' : 'Sign in as guest'}
                  </Button>
                </center>}
              </div>
              : (
                <div className={classes.instruct}>
                  <Instruction />
                  <center>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.backButton}
                      >
                        Back
                    </Button>
                      <Button onClick={() => this.setState({ hasCandidate: true })} variant="contained" color="primary">
                        Start Test
                        </Button>
                    </div>
                  </center>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(App);
