import axios from "axios";
import Message from "components/Message";

async function deleteMerchant(id) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.delete(url + "/merchants/" + id + "/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Merchant " + id + " deleted successfully!");
    return data;
  } catch (error) {
    Message("Could not delete Merchant " + id);
    Message(error);
  }
}

export default deleteMerchant;
