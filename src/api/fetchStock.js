import axios from "axios";
import Message from "components/Message/Message";

async function fetchStock(id) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.get(url + "/stock/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    return data;
  } catch (error) {
    Message("Could not fetch stock: " + error);
  }
}

export default fetchStock;
