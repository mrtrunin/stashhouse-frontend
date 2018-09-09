import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "containers/App/Main/Main";
import PrivateRoute from "./PrivateRoute";
import Warehouses from "containers/Warehouses/Warehouses";
import Login from "containers/Login/Login";
import Logout from "containers/Logout/Logout";
import Transaction from "containers/Transaction/Transaction";
import Transactions from "containers/Transactions/Transactions";

import Payments from "containers/Payments/Payments";
import Customers from "containers/Customers/Customers";
import Business from "containers/Business/Business";
import Reports from "containers/Reports/Reports";

import LandingPage from "containers/LandingPage/LandingPage";
import Businesses from "containers/Businesses/Businesses";

const Router = () => {
  return (
    <Main>
      <Switch>
        <PrivateRoute path="/product/:productId" component={Warehouses} />
        <PrivateRoute path="/warehouses/:warehouseId" component={Warehouses} />
        <PrivateRoute exact path="/warehouses/" component={Warehouses} />
        <PrivateRoute
          path="/:transactionType(buy|move|sell)/:transactionId"
          component={Transaction}
        />
        <PrivateRoute
          path="/:transactionType(buy|move|sell)/"
          component={Transaction}
        />
        <PrivateRoute exact path="/transactions/" component={Transactions} />
        <PrivateRoute path="/payment/:paymentId" component={Payments} />
        <PrivateRoute exact path="/payments/" component={Payments} />
        <PrivateRoute
          exact
          path="/payments/invoice/:invoiceId"
          component={Payments}
        />
        <PrivateRoute path="/customer/:customerId" component={Customers} />
        <PrivateRoute exact path="/customers/" component={Customers} />
        <PrivateRoute exact path="/settings/" component={Business} />
        <PrivateRoute exact path="/businesses/" component={Businesses} />
        <PrivateRoute exact path="/reports/" component={Reports} />
        <Route exact path="/logout/" component={Logout} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/" component={LandingPage} />
        <Redirect exact from="/" to="/warehouses/" />
      </Switch>
    </Main>
  );
};

export default Router;
