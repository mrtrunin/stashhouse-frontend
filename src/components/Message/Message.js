import PropTypes from "prop-types";
import { openMessage } from "./MessageActions";

const Message = (message, variant = "info", statusCode = undefined) => {
  const validTypes = ["info", "success", "error", "warning"];

  if (!validTypes.includes(variant)) {
    variant = "error";
  }

  if (statusCode) {
    message = statusCode.toString() + ": " + message;
  }

  if (typeof message === "string") {
    openMessage(message, variant);
  } else {
    openMessage("ERROR WITH MESSAGE", "error");
  }
};

// TODO: Any time there is a "REJECTED" event sent, the message box should pick it up

Message.propTypes = {
  actions: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["info", "success", "error", "warning"])
};

export default Message;
