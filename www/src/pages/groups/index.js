import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GroupPage from './Group';
import GroupsPage from './Groups';

const GroupRoute = () => (
  <Switch>
    <Route path='/groups/:id' component={GroupPage} />
    <Route path='/groups' component={GroupsPage}/>
  </Switch>
)

export default GroupRoute;
