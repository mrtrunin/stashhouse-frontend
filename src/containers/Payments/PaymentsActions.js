import axios from "axios";

export const FETCH_PAYMENTS = "FETCH_PAYMENTS";
export const FETCH_PAYMENTS_FULFILLED = "FETCH_PAYMENTS_FULFILLED";
export const FETCH_PAYMENTS_REJECTED = "FETCH_PAYMENTS_REJECTED";

const url = process.env.REACT_APP_SERVER_URL;

export function fetchPayments(businessName) {
  return async dispatch => {
    await dispatch({
      type: FETCH_PAYMENTS
    });

    try {
      const { data } = await axios.get(
        url + "/payments/?business_name=" + businessName,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );

      await dispatch({
        type: FETCH_PAYMENTS_FULFILLED,
        payload: data
      });
      return data;
    } catch (error) {
      dispatch({
        type: FETCH_PAYMENTS_REJECTED,
        payload: error
      });
      return error;
    }
  };
}
