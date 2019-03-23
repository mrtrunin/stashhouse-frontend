import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "components/App/Main/Main";
import PrivateRoute from "./PrivateRoute";
import Warehouses from "pages/Warehouses/Warehouses";
import Login from "pages/Login/Login";
import Logout from "pages/Logout/Logout";
import Transaction from "pages/Transaction/Transaction";
import Transactions from "pages/Transactions/Transactions";

import Payments from "pages/Payments/Payments";
import Customers from "pages/Customers/Customers";
import Business from "pages/Business/Business";
import Reports from "pages/Reports/Reports";
import Emails from "pages/Emails/Emails";

import LandingPage from "pages/LandingPage/LandingPage";
import Businesses from "pages/Businesses/Businesses";

const Router = () => {
  return (
    <Main>
      <Switch>
        <PrivateRoute path="/product/:productId" component={Warehouses} />
        <PrivateRoute path="/warehouses/:warehouseId" component={Warehouses} />
        <PrivateRoute exact path="/warehouses/" component={Warehouses} />
        <PrivateRoute
          path="/:transactionType(buy|move|sell|writeoff)/:transactionId"
          component={Transaction}
        />
        <PrivateRoute
          path="/:transactionType(buy|move|sell|writeoff)/"
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
        <PrivateRoute exact path="/emails/" component={Emails} />
        <PrivateRoute exact path="/emails/:transactionId" component={Emails} />
        <Route exact path="/logout/" component={Logout} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/" component={LandingPage} />
        <Redirect exact from="/" to="/warehouses/" />
      </Switch>
    </Main>
  );
};

export default Router;
