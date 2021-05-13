import React from "react";
import PropTypes from "prop-types";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./style.css";

export default class Message extends React.Component {
  static propTypes = {
    messageId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    isDeleting: PropTypes.bool,
    deleteMessage: PropTypes.func.isRequired,
  };
  handleDeleteMessage = () => {
    const { messageId } = this.props;
    this.props.deleteMessage(messageId);
  };
  render() {
    const { text, sender, isDeleting } = this.props;
    const isBot = sender === "robot";
    const deleteButtonStyle = {
      [isBot ? "right" : "left"]: -48,
    };

    return (
      <div className="message-wrapper">
        <div
          className="message"
          style={{ alignSelf: isBot ? "flex-start" : "flex-end" }}
        >
          <div>{text}</div>
          <div className="message-sender">{sender}</div>
          {isDeleting ? (
            <CircularProgress
              size={20}
              className="message-deleting"
              style={deleteButtonStyle}
            />
          ) : (
            <IconButton
              style={deleteButtonStyle}
              className="message-delete"
              onClick={this.handleDeleteMessage}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>
    );
  }
}
