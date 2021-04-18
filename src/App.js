import React from "react";
import Home from './components/Home'
import Payment from './components/Payment'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App(){
  return (
    <Router>
    <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/payment/:hotelId' component={Payment} />
    </Switch>
    </Router>
  )
}

export default App;