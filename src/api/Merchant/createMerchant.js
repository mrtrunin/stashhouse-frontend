import axios from "axios";
import Message from "components/Message";

async function createMerchant(
  name,
  address,
  zip_code,
  city,
  country,
  phone_number
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
    const { data } = await axios.post(url + "/merchants/", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Merchant Created!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default createMerchant;
