import store from "store";
import axios from "axios";

async function fetchBusiness(businessId) {
  let url = process.env.REACT_APP_SERVER_URL;

  store.dispatch({
    type: "FETCH_BUSINESS"
  });

  try {
    const { data } = await axios.get(url + "/businesses/" + businessId, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    store.dispatch({
      type: "FETCH_BUSINESS_FULFILLED",
      payload: data
    });
  } catch (error) {
    store.dispatch({
      type: "FETCH_BUSINESS_REJECTED",
      payload: error
    });
  }
}

export default fetchBusiness;
