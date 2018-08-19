import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "containers/App/Main/Main";
import PrivateRoute from "./PrivateRoute";
import Warehouse from "containers/Warehouse";
import Login from "containers/Login/Login";
import Logout from "containers/Logout/Logout";
import Transaction from "containers/Transaction";
import Transactions from "containers/Transactions/Transactions";

import PaymentList from "containers/PaymentList";
import Customers from "containers/Customers/Customers";
import Settings from "containers/Settings";

import LandingPage from "containers/LandingPage/LandingPage";
import BusinessChoice from "containers/BusinessChoice";

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
        <PrivateRoute exact path="/transactions/" component={Transactions} />
        <PrivateRoute path="/payment/:paymentId" component={PaymentList} />
        <PrivateRoute exact path="/payment-list/" component={PaymentList} />
        <PrivateRoute
          exact
          path="/payment-list/invoice/:invoiceId"
          component={PaymentList}
        />
        <PrivateRoute path="/customer/:customerId" component={Customers} />
        <PrivateRoute exact path="/customer-list/" component={Customers} />
        <PrivateRoute exact path="/settings/" component={Settings} />
        <PrivateRoute
          exact
          path="/business-choice/"
          component={BusinessChoice}
        />
        <Route exact path="/logout/" component={Logout} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/" component={LandingPage} />
        <Redirect exact from="/" to="/warehouse/" />
      </Switch>
    </Main>
  );
};

export default Router;
