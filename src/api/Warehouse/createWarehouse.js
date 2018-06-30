import axios from "axios";
import Message from "components/Message";

async function createWarehouse(name) {
  let url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload.name = name;

  try {
    const { data } = await axios.post(url + "/warehouses/", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Warehouse Created!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default createWarehouse;
