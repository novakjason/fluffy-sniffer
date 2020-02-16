import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Page imports
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
// Utility import
import API from "./utils/API";
// Component imports
import Nav from "./components/Nav";

const requireLogin = (nextState, replace, cb) => {
  const data = API.userLoginCheck(response => { return response.data });
  console.log(data);
  if (!data.user === false) {
    replace("/");
  }
  cb();
};

class App extends React.Component {

  render() {

    return (

      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route onEnter={requireLogin} >
              <Route path="/app"
                render={({ match: { path } }) => (
                  <>
                    <Route path={`${path}`} component={Homepage} exact />
                  </>
                )
                }
              />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
