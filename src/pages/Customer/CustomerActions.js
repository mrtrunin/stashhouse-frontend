import axios from "axios";
import Message from "components/Message/Message";

export const FETCH_CUSTOMER = "FETCH_CUSTOMER";
export const FETCH_CUSTOMER_FULFILLED = "FETCH_CUSTOMER_FULFILLED";
export const CUSTOMER_UPDATE_FIELD = "CUSTOMER_UPDATE_FIELD";
export const FETCH_CUSTOMER_REJECTED = "FETCH_CUSTOMER_REJECTED";
export const RESET_CUSTOMER = "RESET_CUSTOMER";

const url = process.env.REACT_APP_SERVER_URL;

export function createCustomer(
  name,
  email,
  address,
  zip_code,
  city,
  country,
  phone_number,
  default_warehouse,
  business_name
) {
  return async () => {
    let payload = {};

    payload = {
      name,
      email,
      address,
      zip_code,
      city,
      country,
      phone_number,
      default_warehouse,
      business: {
        name: business_name
      }
    };

    try {
      const { data } = await axios.post(url + "/customers/", payload);

      Message("Customer Created!", "success");

      return data;
    } catch (error) {
      Message("Could not create customer: " + error, "error");
    }
  };
}

export function fetchCustomer(customerId) {
  return async dispatch => {
    dispatch({
      type: FETCH_CUSTOMER
    });

    try {
      const { data } = await axios.get(url + "/customers/" + customerId);

      dispatch({
        type: FETCH_CUSTOMER_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_CUSTOMER_REJECTED,
        payload: error
      });
    }
  };
}

export function deleteCustomer(id) {
  return async dispatch => {
    try {
      const { data } = await axios.delete(url + "/customers/" + id + "/");

      Message("Customer " + id + " deleted successfully!", "success");
      return data;
    } catch (error) {
      Message("Could not delete Customer " + id + ": " + error, "error");
    }
  };
}

export function updateCustomer(
  name,
  email,
  address,
  zip_code,
  city,
  country,
  phone_number,
  default_warehouse,
  customerId
) {
  return async dispatch => {
    let payload = {};

    payload = {
      name,
      email,
      address,
      zip_code,
      city,
      country,
      phone_number,
      default_warehouse
    };

    try {
      const { data } = await axios.patch(
        url + "/customers/" + customerId + "/",
        payload,
        {}
      );

      Message("Customer Updated Successfully!", "success");

      return data;
    } catch (error) {
      Message("Could not update customer: " + error, "error");
    }
  };
}

export function resetCustomer() {
  return async dispatch => {
    dispatch({
      type: RESET_CUSTOMER
    });
  };
}

export function updateCustomerField(value, field) {
  return async dispatch => {
    dispatch({
      type: CUSTOMER_UPDATE_FIELD,
      payload: value,
      field: field
    });
  };
}
