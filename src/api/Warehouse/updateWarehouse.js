import axios from "axios";
import Message from "components/Message";

async function updateWarehouse(name, warehouseId) {
  let url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload.name = name;

  try {
    const { data } = await axios.patch(
      url + "/warehouses/" + warehouseId + "/",
      payload,
      {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      }
    );

    Message("Warehouse Updated Successfully!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default updateWarehouse;
