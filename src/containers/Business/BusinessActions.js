import axios from "axios";
import Message from "components/Message";

export const FETCH_BUSINESS = "FETCH_BUSINESS";
export const FETCH_BUSINESS_FULFILLED = "FETCH_BUSINESS_FULFILLED";
export const FETCH_BUSINESS_REJECTED = "FETCH_BUSINESS_REJECTED";
export const RESET_BUSINESS = "RESET_BUSINESS";
export const BUSINESS_UPDATE_FIELD = "BUSINESS_UPDATE_FIELD";

const url = process.env.REACT_APP_SERVER_URL;

export function createBusiness(
  name,
  address,
  zip_code,
  city,
  country,
  phone_number,
  registry_number,
  vat_number,
  email,
  website,
  primary_bank,
  primary_account_number
) {
  return async dispatch => {
    let payload = {};

    payload = {
      name,
      address,
      zip_code,
      city,
      country,
      phone_number,
      registry_number,
      vat_number,
      email,
      website,
      primary_bank,
      primary_account_number
    };

    try {
      const { data } = await axios.post(url + "/businesses/", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      Message("Business has been created successfully!");

      return data;
    } catch (error) {
      Message(error, "error");
    }
  };
}

export function fetchBusiness(businessId) {
  return async dispatch => {
    let url = process.env.REACT_APP_SERVER_URL;

    dispatch({
      type: FETCH_BUSINESS
    });

    try {
      const { data } = await axios.get(url + "/businesses/" + businessId, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      dispatch({
        type: FETCH_BUSINESS_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_BUSINESS_REJECTED,
        payload: error
      });
    }
  };
}

export function updateBusiness(
  id,
  name,
  address,
  zip_code,
  city,
  country,
  phone_number,
  registry_number,
  vat_number,
  email,
  website,
  primary_bank,
  primary_account_number
) {
  return async dispatch => {
    let url = process.env.REACT_APP_SERVER_URL;

    let payload = {};

    payload = {
      name,
      address,
      zip_code,
      city,
      country,
      phone_number,
      registry_number,
      vat_number,
      email,
      website,
      primary_bank,
      primary_account_number
    };

    try {
      const { data } = await axios.patch(
        url + "/businesses/" + id + "/",
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );

      Message("Business Updated Successfully!");

      return data;
    } catch (error) {
      Message(error, "error");
    }
  };
}

export function updateBusinessField(value, name) {
  return async dispatch => {
    dispatch({
      type: BUSINESS_UPDATE_FIELD,
      field: name,
      payload: value
    });
  };
}
