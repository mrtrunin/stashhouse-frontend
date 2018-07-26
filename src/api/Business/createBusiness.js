import axios from "axios";
import Message from "components/Message";

async function createBusiness(
  name,
  address,
  zip_code,
  city,
  country,
  phone_number,
  registry_number,
  vat_number,
  email,
  website,
  primary_bank,
  primary_account_number
) {
  let url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload = {
    name,
    address,
    zip_code,
    city,
    country,
    phone_number,
    registry_number,
    vat_number,
    email,
    website,
    primary_bank,
    primary_account_number
  };

  try {
    const { data } = await axios.post(url + "/businesses/", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Business has been created successfully!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default createBusiness;
