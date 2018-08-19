import axios from "axios";
import Message from "components/Message";

async function deleteCustomer(id) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.delete(url + "/customers/" + id + "/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Customer " + id + " deleted successfully!");
    return data;
  } catch (error) {
    Message("Could not delete Customer " + id);
    Message(error);
  }
}

export default deleteCustomer;
