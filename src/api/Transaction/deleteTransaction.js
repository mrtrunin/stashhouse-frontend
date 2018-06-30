import axios from "axios";
import Message from "components/Message";

async function deleteTransaction(id) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.delete(url + "/transactions/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Transaction " + id + " deleted successfully!");
    return data;
  } catch (error) {
    Message(error);
  }
}

export default deleteTransaction;
