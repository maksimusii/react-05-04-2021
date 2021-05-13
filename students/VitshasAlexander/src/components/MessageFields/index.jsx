import React from "react";
import PropTypes from "prop-types";

import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";

import Message from "../../containers/Message";
import "./style.css";

export default class MessageFields extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isSending: PropTypes.bool,

    chatId: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,

    sendMessage: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
  };

  state = {
    humanInput: "",
  };

  constructor(props) {
    super(props);

    this.messageFieldRef = React.createRef();
  }

  componentDidMount() {
    const { chatId, loadMessages } = this.props;

    loadMessages(chatId);
  }
  componentDidUpdate(prevProps) {
    const { chatId, loadMessages } = this.props;

    if (prevProps.chatId !== chatId) {
      loadMessages(chatId);
    }
    this.messageFieldRef.current.scrollTop =
      this.messageFieldRef.current.scrollHeight -
      this.messageFieldRef.current.clientHeight;
  }

  sendMessage = () => {
    const { humanInput } = this.state;

    if (!humanInput) return;

    const { chatId } = this.props;

    // const lastMessageId = Number(Object.keys(messages).pop());
    // const messageId = lastMessageId + 1;

    this.props.sendMessage({
      chatId,
      text: humanInput,
      sender: "human",
    });

    this.setState({
      humanInput: "",
    });
  };

  handleChange = (event) => {
    this.setState(() => ({
      humanInput: event.target.value,
    }));
  };

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      return this.sendMessage();
    }
  };

  render() {
    const { messages, isLoading, isSending } = this.props;

    const messageElements = Object.values(messages).map(
      ({ id, text, sender, isDeleting }) => {
        return (
          <Message
            key={id}
            messageId={id}
            text={text}
            isDeleting={isDeleting}
            sender={sender}
          />
        );
      }
    );

    return (
      <>
        <div ref={this.messageFieldRef} className="message-field">
          {isLoading ? (
            <CircularProgress />
          ) : messageElements.length ? (
            messageElements
          ) : (
            <div style={{ color: "black" }}>Список сообщений пуст</div>
          )}
        </div>
        <div className="actions">
          <TextField
            style={{ marginRight: "12px" }}
            fullWidth
            type="text"
            autoFocus
            placeholder="Введите что-нибудь"
            value={this.state.humanInput}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
          <Fab
            color="primary"
            disabled={this.state.humanInput === ""}
            onClick={this.sendMessage}
          >
            {isSending ? <CircularProgress size={20} /> : <SendIcon />}
          </Fab>
        </div>
      </>
    );
  }
}
