import axios from "axios";
import Message from "components/Message";

async function createMerchant(
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
