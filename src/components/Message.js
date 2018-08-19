import showMessage from "./SnackBar/actions/showMessage";

const Message = message => {
  try {
    if (
      typeof message === "object" &&
      message.response &&
      message.response.status &&
      message.response.statusText
    ) {
      message = message.response.status + ": " + message.response.statusText;
    }
    console.log(message);
    // return showMessage(message);
  } catch (error) {
    console.error("MESSAGE ERROR WITH Message.js");
    console.error(error);
  }
};

Message.propTypes = {};

export default Message;
