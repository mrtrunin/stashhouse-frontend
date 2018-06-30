import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "containers/Main";
import PrivateRoute from "./PrivateRoute";
import Warehouse from "containers/Main/Warehouse";
import Login from "containers/Main/Login";
import Logout from "containers/Main/Logout";
import Transaction from "containers/Main/Transaction";
import TransactionList from "containers/Main/TransactionList";

import PaymentList from "containers/Main/PaymentList";
import CustomerList from "containers/Main/CustomerList";
import Test from "containers/Main/Test";

import LandingPage from "containers/LandingPage";

const Router = () => {
  return (
    <Main>
      <Switch>
        <PrivateRoute path="/product/:productId" component={Warehouse} />
        <PrivateRoute path="/warehouse/:warehouseId" component={Warehouse} />
        <PrivateRoute exact path="/warehouse/" component={Warehouse} />
        <PrivateRoute
          path="/:transactionType(buy|move|sell)/:transactionId"
          component={Transaction}
        />
        <PrivateRoute
          path="/:transactionType(buy|move|sell)/"
          component={Transaction}
        />
        <PrivateRoute
          exact
          path="/transaction-list/"
          component={TransactionList}
        />
        <PrivateRoute path="/payment/:paymentId" component={PaymentList} />
        <PrivateRoute exact path="/payment-list/" component={PaymentList} />
        <PrivateRoute path="/customer/:merchantId" component={CustomerList} />
        <PrivateRoute exact path="/customer-list/" component={CustomerList} />
        <Route exact path="/logout/" component={Logout} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/test/" component={Test} />
        <Redirect exact from="/" to="/warehouse/" />
      </Switch>
    </Main>
  );
};

export default Router;
