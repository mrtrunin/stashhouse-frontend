import axios from "axios";
import Message from "components/Message";

async function fetchTransactionPdf(transactionId, transactionName) {
  let url = process.env.REACT_APP_SERVER_URL;

  try {
    const { data } = await axios.get(
      url + "/transactions/" + transactionId + "/pdf",
      {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      }
    );

    const href = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = href;
    let filename = transactionName + ".pdf";
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    Message("PDF downloaded successfully!");
    return data;
  } catch (error) {
    Message(error.response.data.detail, "error");
  }
}

export default fetchTransactionPdf;
