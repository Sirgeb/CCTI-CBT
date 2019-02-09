import React, { Component } from 'react';
import ReactDOM from "react-dom";
import App from "./Components/App";
import registerServiceWorker from "./registerServiceWorker";
import Test from './Components/routes/Test';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Timeout from './Components/routes/Timeout';
import SubmitResponse from './Components/routes/SubmitResponse';
import Results from './Components/routes/Results';
import Footer from './Components/Footer';
import notFoundPage from './Components/routes/pageNotFound';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
  status: {
    danger: "orange"
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["calibri"].join(","),
    fontSize: 16
  },
});


class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>

          <div className="App">
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/test" component={Test} />
              <Route path="/timeout" component={Timeout} />
              <Route path="/submit-response" component={SubmitResponse} />
              <Route path="/results" component={Results} />
              <Route component={notFoundPage} />
            </Switch>
            <Footer />
          </div>

        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}


ReactDOM.render(<Index />, document.getElementById("root"));
registerServiceWorker();
