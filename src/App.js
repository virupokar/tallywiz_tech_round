import React from 'react'
import Auther from './Auther/auther'
import AutherDetails from './Auther/autherDetails'
import PostDetails from './Auther/postDetails'
import { Switch, Route, Redirect } from 'react-router-dom';
import SideDrawer from './Auther/sideDrawer'

function App() {

  return (
    <>
      <div className="box-shadow site-width" style={{ borderWidth: 1 }}>
        <div className="pull-right">
          <SideDrawer />
        </div>
        <Switch>
          <Route exact path="/" component={Auther} />
          <Route exact path="/details/:id" component={AutherDetails} />
          <Route exact path="/postDetails/:id" component={PostDetails} />
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
}

export default App;
