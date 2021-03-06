import axios from "axios";

export const FETCH_CUSTOMERS = "FETCH_CUSTOMERS";
export const FETCH_CUSTOMERS_FULFILLED = "FETCH_CUSTOMERS_FULFILLED";
export const FETCH_CUSTOMERS_REJECTED = "FETCH_CUSTOMERS_REJECTED";

export function fetchCustomers(businessName) {
  return async dispatch => {
    let url = process.env.REACT_APP_SERVER_URL;

    await dispatch({
      type: FETCH_CUSTOMERS
    });

    try {
      const { data } = await axios.get(
        url + "/customers/?business_name=" + businessName
      );

      await dispatch({
        type: FETCH_CUSTOMERS_FULFILLED,
        payload: data
      });
    } catch (error) {
      await dispatch({
        type: FETCH_CUSTOMERS_REJECTED,
        payload: error
      });
    }
  };
}

export function fetchCustomersByPageUrl(pageUrl) {
  return async dispatch => {
    await dispatch({
      type: FETCH_CUSTOMERS
    });

    try {
      const { data } = await axios.get(pageUrl);

      await dispatch({
        type: FETCH_CUSTOMERS_FULFILLED,
        payload: data
      });
    } catch (error) {
      await dispatch({
        type: FETCH_CUSTOMERS_REJECTED,
        payload: error
      });
    }
  };
}
