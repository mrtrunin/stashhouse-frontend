import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";

import Editor from "components/Editor/Editor";
import EditorHeader from "components/Editor/EditorHeader";
import EditorContent from "components/Editor/EditorContent";
import EditorButtons from "components/Editor/EditorButtons";

import * as businessActions from "./BusinessActions";
import * as businessesActions from "pages/Businesses/BusinessesActions";
import { bindActionCreators } from "redux";

const Business = ({
  business,
  actions: {
    updateBusinessField,
    fetchBusinesses,
    createBusiness,
    updateBusiness
  }
}) => {
  const handleUpdateBusinessField = e => {
    e.preventDefault();
    updateBusinessField(e.target.value, e.target.name);
  };

  useEffect(() => {
    fetchBusinesses();
  }, [business]);

  return (
    <Editor>
      <EditorHeader
        editedObject={business}
        label="Settings"
        editedObjectSubheader="A place where to change your business attributes"
      />
      <EditorContent>
        <TextField
          name="name"
          value={business.name ? business.name : ""}
          label="Business Name"
          margin="dense"
          onChange={handleUpdateBusinessField}
          required
        />

        <TextField
          name="address"
          value={business.address ? business.address : ""}
          label="Address"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="zip_code"
          value={business.zip_code ? business.zip_code : ""}
          label="Zip Code"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="city"
          value={business.city ? business.city : ""}
          label="City"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="country"
          value={business.country ? business.country : ""}
          label="Country"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="phone_number"
          value={business.phone_number ? business.phone_number : ""}
          label="Phone Number"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="email"
          value={business.email ? business.email : ""}
          label="Email"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="website"
          value={business.website ? business.website : ""}
          label="Website"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="registry_number"
          value={business.registry_number ? business.registry_number : ""}
          label="Business Registry Number"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="vat_number"
          value={business.vat_number ? business.vat_number : ""}
          label="VAT Number"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="primary_bank"
          value={business.primary_bank ? business.primary_bank : ""}
          label="Bank"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="primary_account_number"
          value={
            business.primary_account_number
              ? business.primary_account_number
              : ""
          }
          label="Bank Account Number"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="default_email_subject"
          value={
            business.default_email_subject ? business.default_email_subject : ""
          }
          label="Default Email Subject (Note: the transaction number will be added to the subject line)"
          margin="dense"
          onChange={handleUpdateBusinessField}
        />

        <TextField
          name="default_email_body"
          value={business.default_email_body ? business.default_email_body : ""}
          label="Default Email Body"
          margin="dense"
          onChange={handleUpdateBusinessField}
          multiline
        />
      </EditorContent>
      <EditorButtons
        editedObjectLabel="Business"
        editedObject={business}
        createAction={() =>
          createBusiness(
            business.name,
            business.address,
            business.zip_code,
            business.city,
            business.country,
            business.phone_number,
            business.registry_number,
            business.vat_number,
            business.email,
            business.website,
            business.primary_bank,
            business.primary_account_number,
            business.default_email_subject,
            business.default_email_body
          )
        }
        updateAction={() =>
          updateBusiness(
            business.id,
            business.name,
            business.address,
            business.zip_code,
            business.city,
            business.country,
            business.phone_number,
            business.registry_number,
            business.vat_number,
            business.email,
            business.website,
            business.primary_bank,
            business.primary_account_number,
            business.default_email_subject,
            business.default_email_body
          )
        }
      />
    </Editor>
  );
};

Business.propTypes = {
  actions: PropTypes.object,
  business: PropTypes.object
};

const mapStateToProps = state => {
  return {
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...businessActions,
        ...businessesActions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Business);
