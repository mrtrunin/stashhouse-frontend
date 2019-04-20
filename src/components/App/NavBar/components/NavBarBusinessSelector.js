import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  FormControl,
  withStyles,
  Select,
  MenuItem,
  Input
} from "@material-ui/core";
import * as businessActions from "pages/Business/BusinessActions";

const style = () => ({
  businessSelector: {
    color: "white"
  }
});

const NavBarBusinessSelector = ({
  actions: { chooseBusiness },
  classes,
  business,
  businesses
}) => {
  const handleChooseBusiness = e => {
    let selectedBusiness = businesses.find(business => {
      return business.name === e.target.value;
    });

    chooseBusiness(selectedBusiness);
  };

  return (
    <FormControl className={classes.businessSelector}>
      <Select
        value={business.name ? business.name : ""}
        onChange={handleChooseBusiness}
        name="business"
        renderValue={value => value}
        input={<Input id="business" />}
        className={classes.businessSelector}
      >
        {businesses.map(business => {
          return (
            <MenuItem key={business.id} value={business.name}>
              {business.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const mapStateToProps = state => {
  return {
    business: state.business.business,
    businesses: state.businesses.businesses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...businessActions }, dispatch)
  };
};

NavBarBusinessSelector.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  businesses: PropTypes.array,
  business: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(NavBarBusinessSelector));
