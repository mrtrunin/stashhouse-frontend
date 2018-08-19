import axios from "axios";
import Message from "components/Message";

async function createCustomer(
  name,
  address,
  zip_code,
  city,
  country,
  phone_number,
  business_name
) {
  const url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload = {
    name,
    address,
    zip_code,
    city,
    country,
    phone_number,
    business: {
      name: business_name
    }
  };

  try {
    const { data } = await axios.post(url + "/customers/", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Customer Created!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default createCustomer;
