import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import PropTypes from "prop-types";
import { CircularProgress, IconButton } from "@material-ui/core";
import "./style.css";

export default class ChatList extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    chatId: PropTypes.string,
    chats: PropTypes.object.isRequired,
    addChat: PropTypes.func.isRequired,
    loadChats: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  };

  state = {
    chatName: "",
  };

  handleChatNameChange = (event) => {
    this.setState({
      chatName: event.target.value,
    });
  };

  handleAddChatClick = () => {
    this.props.addChat(this.state.chatName);
    this.setState({
      chatName: "",
    });
  };

  handleNavigate = (link) => {
    this.props.push(link);
  };

  componentDidMount() {
    this.props.loadChats();
  }

  render() {
    const { chatName } = this.state;
    const { chatId, chats, isLoading } = this.props;

    if (isLoading) {
      return (
        <div className="chat-list">
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="chat-list">
        <List>
          {Object.entries(chats).map(([id, value]) => (
            <ListItem
              key={id}
              button
              selected={id === chatId}
              className={value.highlight === true ? "glow" : ""}
              onClick={() => this.handleNavigate(`/chat/${id}`)}
            >
              <div className="chat-list-icon" />
              <ListItemText primary={value.title} />
            </ListItem>
          ))}
          <ListItem>
            <TextField value={chatName} onChange={this.handleChatNameChange} />
            <IconButton onClick={this.handleAddChatClick} disabled={!chatName}>
              <SendIcon />
            </IconButton>
          </ListItem>
        </List>
      </div>
    );
  }
}
