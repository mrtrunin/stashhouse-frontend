import axios from "axios";

export const FETCH_WAREHOUSES = "FETCH_WAREHOUSES";
export const FETCH_WAREHOUSES_FULFILLED = "FETCH_WAREHOUSES_FULFILLED";
export const FETCH_WAREHOUSES_REJECTED = "FETCH_WAREHOUSES_REJECTED";

export function fetchWarehouses(business_name) {
  return async dispatch => {
    let url = process.env.REACT_APP_SERVER_URL;
    await dispatch({ type: FETCH_WAREHOUSES });

    try {
      const { data } = await axios.get(
        url + "/warehouses/?business_name=" + business_name
      );

      await dispatch({
        type: FETCH_WAREHOUSES_FULFILLED,
        payload: data
      });
    } catch (error) {
      await dispatch({
        type: FETCH_WAREHOUSES_REJECTED,
        payload: error
      });
    }
  };
}

export default fetchWarehouses;
