import axios from "axios";
import Message from "components/Message";

async function createPayment(
  date_payment,
  transactionId,
  amount,
  sender_name,
  payment_method,
  description,
  business_name
) {
  let url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload.date_payment = date_payment;
  payload.transaction = transactionId;
  payload.amount = amount;
  payload.sender_name = sender_name;
  payload.payment_method = payment_method;
  payload.description = description;
  payload.business = {
    name: business_name
  };

  try {
    const { data } = await axios.post(url + "/payments/", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Payment Created!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default createPayment;
