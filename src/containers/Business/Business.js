import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";

import Editor from "components/Editors/EditorComponents/Editor";
import EditorHeader from "components/Editors/EditorComponents/EditorHeader";
import EditorContent from "components/Editors/EditorComponents/EditorContent";
import EditorButtons from "components/Editors/EditorComponents/EditorButtons";

import * as businessActions from "./BusinessActions";
import * as businessesActions from "containers/Businesses/BusinessesActions";
import { bindActionCreators } from "redux";

export class Business extends Component {
  handleBusinessChange = e => {
    const { name, value } = e.target;
    const {
      actions: { updateBusinessField }
    } = this.props;

    updateBusinessField(value, name);
  };

  handleCreateOrUpdateBusiness = async () => {
    const {
      business,
      actions: { fetchBusinesses, createBusiness, updateBusiness }
    } = this.props;

    if (business.id !== undefined) {
      await updateBusiness(
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
        business.primary_account_number
      );
    } else {
      await createBusiness(
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
        business.primary_account_number
      );
    }

    await fetchBusinesses();
  };

  render() {
    const { business } = this.props;

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
            onChange={this.handleBusinessChange}
            required
          />

          <TextField
            name="address"
            value={business.address ? business.address : ""}
            label="Address"
            margin="dense"
            onChange={this.handleBusinessChange}
          />

          <TextField
            name="zip_code"
            value={business.zip_code ? business.zip_code : ""}
            label="Zip Code"
            margin="dense"
            onChange={this.handleBusinessChange}
          />

          <TextField
            name="city"
            value={business.city ? business.city : ""}
            label="City"
            margin="dense"
            onChange={this.handleBusinessChange}
          />

          <TextField
            name="country"
            value={business.country ? business.country : ""}
            label="Country"
            margin="dense"
            onChange={this.handleBusinessChange}
          />

          <TextField
            name="phone_number"
            value={business.phone_number ? business.phone_number : ""}
            label="Phone Number"
            margin="dense"
            onChange={this.handleBusinessChange}
          />

          <TextField
            name="email"
            value={business.email ? business.email : ""}
            label="Email"
            margin="dense"
            onChange={this.handleBusinessChange}
          />

          <TextField
            name="website"
            value={business.website ? business.website : ""}
            label="Website"
            margin="dense"
            onChange={this.handleBusinessChange}
          />

          <TextField
            name="registry_number"
            value={business.registry_number ? business.registry_number : ""}
            label="Business Registry Number"
            margin="dense"
            onChange={this.handleBusinessChange}
          />

          <TextField
            name="vat_number"
            value={business.vat_number ? business.vat_number : ""}
            label="VAT Number"
            margin="dense"
            onChange={this.handleBusinessChange}
          />

          <TextField
            name="primary_bank"
            value={business.primary_bank ? business.primary_bank : ""}
            label="Bank"
            margin="dense"
            onChange={this.handleBusinessChange}
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
            onChange={this.handleBusinessChange}
          />
        </EditorContent>
        <EditorButtons
          editedObjectLabel="Business"
          editedObject={business}
          createAction={this.handleCreateOrUpdateBusiness}
          updateAction={this.handleCreateOrUpdateBusiness}
        />
      </Editor>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Business);
