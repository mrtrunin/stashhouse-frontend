import Message from "components/Message";
import store from "store";
import axios from "axios";

async function fetchBusinesses() {
  const { data } = await axios.get(
    process.env.REACT_APP_SERVER_URL + "/businesses/",
    {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    }
  );

  try {
    store.dispatch({
      type: "FETCH_BUSINESSES_FULFILLED",
      payload: data
    });
  } catch (error) {
    Message(error);
  }
}

export default fetchBusinesses;
