import axios from "axios";
import Message from "components/Message";

async function deleteProduct(id) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.delete(url + "/products/" + id + "/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Product " + id + " deleted successfully!");
    return data;
  } catch (error) {
    Message("Could not delete Product " + id);
    Message(error);
  }
}

export default deleteProduct;
