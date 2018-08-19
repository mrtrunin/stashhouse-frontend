import axios from "axios";

export const FETCH_WAREHOUSES = "FETCH_WAREHOUSES";
export const FETCH_WAREHOUSES_FULFILLED = "FETCH_WAREHOUSES_FULFILLED";
export const FETCH_WAREHOUSES_REJECTED = "FETCH_WAREHOUSES_REJECTED";

export function fetchWarehouses(business_name) {
  return async dispatch => {
    let url = process.env.REACT_APP_SERVER_URL;

    dispatch({ type: FETCH_WAREHOUSES });

    try {
      const { data } = await axios.get(
        url + "/warehouses/?business_name=" + business_name,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );

      dispatch({
        type: FETCH_WAREHOUSES_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_WAREHOUSES_REJECTED,
        payload: error
      });
    }
  };
}

export default fetchWarehouses;
