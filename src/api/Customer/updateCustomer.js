import axios from "axios";
import Message from "components/Message";

async function updateCustomer(
  name,
  address,
  zip_code,
  city,
  country,
  phone_number,
  customerId
) {
  const url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload = {
    name,
    address,
    zip_code,
    city,
    country,
    phone_number
  };

  try {
    const { data } = await axios.patch(
      url + "/customers/" + customerId + "/",
      payload,
      {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      }
    );

    Message("Customer Updated Successfully!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default updateCustomer;
