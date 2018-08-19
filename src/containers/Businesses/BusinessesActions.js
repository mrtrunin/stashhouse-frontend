import Message from "components/Message";
import axios from "axios";

export const FETCH_BUSINESSES = "FETCH_BUSINESSES";
export const FETCH_BUSINESSES_FULFILLED = "FETCH_BUSINESSES_FULFILLED";
export const FETCH_BUSINESSES_REJECTED = "FETCH_BUSINESSES_REJECTED";

export function fetchBusinesses() {
  return async dispatch => {
    dispatch({ type: FETCH_BUSINESSES });
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/businesses/",
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );
      await dispatch({
        type: FETCH_BUSINESSES_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_BUSINESSES_REJECTED,
        payload: error
      });
      Message(error);
    }
  };
}

export default fetchBusinesses;
