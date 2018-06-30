import axios from "axios";
import Message from "components/Message";

async function fetchTransaction(id) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.get(url + "/transactions/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    return data;
  } catch (error) {
    Message("Transaction " + id + ": " + error.response.data.detail);
    return error.response;
  }
}

export default fetchTransaction;
