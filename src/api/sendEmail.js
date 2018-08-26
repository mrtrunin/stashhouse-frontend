import axios from "axios";
import Message from "components/Message/Message";
// import qs from "qs";

async function sendEmail(
  business_name,
  transactionId,
  recipients,
  subject,
  body
) {
  const url = process.env.REACT_APP_SERVER_URL;

  let formdata = new FormData();
  formdata.append("subject", subject);
  formdata.append("body", body);
  formdata.append("recipients", recipients);

  try {
    const { data } = await axios.post(
      url +
        "/transactions/" +
        transactionId +
        "/send-email?business_name=" +
        business_name,
      formdata,
      {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      }
    );
    Message("Email sent successfully!", "success");
    return data;
  } catch (error) {
    Message("Sending email failed: " + error, "error");
  }
}

export default sendEmail;
