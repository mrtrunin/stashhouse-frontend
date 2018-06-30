import showMessage from "./SnackBar/actions/showMessage";

const Message = message => {
  try {
    if (typeof message === "object") {
      message = message.response.status + ": " + message.response.statusText;
    }
    return showMessage(message);
  } catch (error) {
    console.log("MESSAGE ERROR WITH Message.js");
    console.log(error);
  }
};

Message.propTypes = {};

export default Message;
