import showMessage from "./SnackBar/actions/showMessage";

const Message = message => {
  try {
    console.log(message);
    if (
      typeof message === "object" &&
      message.response &&
      message.response.status &&
      message.response.statusText
    ) {
      const messageToShow =
        message.response.status + ": " + message.response.statusText;
      return showMessage(messageToShow);
    }
    console.error(message);
    return showMessage("Unknown error: read console");
  } catch (error) {
    console.error("MESSAGE ERROR WITH Message.js");
    console.error(error);
  }
};

Message.propTypes = {};

export default Message;
