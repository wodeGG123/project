import React from 'react';
import { Router, Route, Redirect } from 'dva/router';
import IndexPage from './routes/index';
import Dashboard from './routes/dashboard/index';
import Agent from './routes/agent/index';
import MyCruise from './routes/myCruise/index';
import Help from './routes/help/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <IndexPage>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/agent" exact component={Agent} />
          <Route path="/mycruise" exact component={MyCruise} />
          <Route path="/help" exact component={Help} />
          {history.location.pathname === '/'?<Redirect from="/" to="/agent" />:null}
      </IndexPage>
    </Router>
  );
}

export default RouterConfig;
