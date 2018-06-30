import axios from "axios";
import Message from "components/Message";

async function updatePayment(
  date_payment,
  transactionId,
  amount,
  sender_name,
  payment_method,
  description,
  paymentId
) {
  let url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload.date_payment = date_payment;
  payload.transaction = transactionId;
  payload.amount = amount;
  payload.sender_name = sender_name;
  payload.payment_method = payment_method;
  payload.description = description;

  try {
    const { data } = await axios.patch(
      url + "/payments/" + paymentId + "/",
      payload,
      {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      }
    );

    Message("Payment Updated Successfully!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default updatePayment;
