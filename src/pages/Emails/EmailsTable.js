import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  withStyles,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import TableBase from "components/Table/TableBase";
import { green800 } from "material-ui/styles/colors";
import { red800 } from "material-ui/styles/colors";
import { green50 } from "material-ui/styles/colors";
import { red50 } from "material-ui/styles/colors";

export const EmailsTableStyle = theme => ({
  root: {
    overflowX: "auto"
  },
  sentEmail: {
    color: green800,
    fontWeight: "bold",
    backgroundColor: green50
  },
  unsentEmail: {
    color: red800,
    fontWeight: "bold",
    backgroundColor: red50
  }
});

const EmailsTable = ({ emails, classes }) => {
  if (!emails) {
    return "No emails";
  }

  return (
    <TableBase>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date created</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email, i) => {
            return (
              <TableRow
                key={i}
                className={
                  email.status === "SENT"
                    ? classes.sentEmail
                    : classes.unsentEmail
                }
              >
                <TableCell>
                  {moment(email.date_created).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{email.subject}</TableCell>
                <TableCell>{email.body}</TableCell>
                <TableCell>{email.from_email}</TableCell>
                <TableCell>
                  {email.recipient_list
                    .replace("['", "")
                    .replace("']", "")
                    .split("', '")
                    .join(", ")}
                </TableCell>
                <TableCell
                  className={
                    email.status === "SENT"
                      ? classes.sentEmail
                      : classes.unsentEmail
                  }
                >
                  {email.status}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableBase>
  );
};

EmailsTable.propTypes = {
  classes: PropTypes.object,
  emails: PropTypes.array
};

export default withStyles(EmailsTableStyle)(EmailsTable);
