import axios from "axios";
import Message from "components/Message";

async function deleteWarehouse(id) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.delete(url + "/warehouses/" + id + "/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Warehouse " + id + " deleted successfully!");
    return data;
  } catch (error) {
    Message("Could not delete Warehouse " + id);
    Message(error);
  }
}

export default deleteWarehouse;
