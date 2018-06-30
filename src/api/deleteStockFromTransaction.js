import axios from "axios";
import Message from "components/Message";

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

    Message("Stock deleted!");

    return data;
  } catch (error) {
    console.log(error);
    // Message(error, "error");
  }
}

export default deleteStockFromTransaction;
