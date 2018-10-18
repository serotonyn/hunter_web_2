import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import SinglePinterest from "./SinglePinterest";
import Top from "./Top";

export default class extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Top} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/app_1/:id" component={SinglePinterest} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
