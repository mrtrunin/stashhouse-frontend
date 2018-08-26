import axios from "axios";
import Message from "components/Message/Message";

async function deleteStockFromTransaction(transactionId) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.delete(
      url + "/stock/?transactionId=" + transactionId,
      {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      }
    );

    Message("Stock deleted!", "success");

    return data;
  } catch (error) {
    Message("Could not delete stock: " + error, "error");
  }
}

export default deleteStockFromTransaction;
