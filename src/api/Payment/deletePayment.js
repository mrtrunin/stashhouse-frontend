import axios from "axios";
import Message from "components/Message";

async function deletePayment(id) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.delete(url + "/payments/" + id + "/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Payment " + id + " deleted successfully!");
    return data;
  } catch (error) {
    Message("Could not delete Payment " + id);
    Message(error);
  }
}

export default deletePayment;
