import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  withStyles,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from "@material-ui/core";
import TableBase from "components/Table/TableBase";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";

export const EmailsTableStyle = theme => ({
  root: {
    overflowX: "auto"
  },
  sentEmail: {
    color: green[800],
    fontWeight: "bold"
  },
  unsentEmail: {
    color: red[800],
    fontWeight: "bold",
    backgroundColor: red[50]
  }
});

const EmailsTable = ({ emails, classes, count, page, handleChangePage }) => {
  if (!emails) {
    return "No emails";
  }

  return (
    <TableBase>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date created</TableCell>
            {/* <TableCell>From</TableCell> */}
            <TableCell>To</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails &&
            emails.length > 0 &&
            emails.map((email, i) => {
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
                    {moment(email.date_created).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  {/* <TableCell>{email.from_email}</TableCell> */}
                  <TableCell>
                    {email.recipient_list
                      .replace("['", "")
                      .replace("']", "")
                      .split("', '")
                      .join(", ")}
                  </TableCell>
                  <TableCell>{email.subject}</TableCell>
                  <TableCell>{email.body}</TableCell>
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
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={10}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[10]}
      />
    </TableBase>
  );
};

EmailsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  emails: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired
};

export default withStyles(EmailsTableStyle)(EmailsTable);
