import axios from "axios";
import Message from "components/Message";

async function updateMerchant(
  name,
  address,
  zip_code,
  city,
  country,
  phone_number,
  merchantId
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
      url + "/merchants/" + merchantId + "/",
      payload,
      {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      }
    );

    Message("Merchant Updated Successfully!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default updateMerchant;
