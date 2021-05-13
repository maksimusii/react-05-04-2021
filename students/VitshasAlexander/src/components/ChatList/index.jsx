import React from "react";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./style.css";

export default class ChatList extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    chatId: PropTypes.string,
    chats: PropTypes.objectOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        unread: PropTypes.bool,
      })
    ).isRequired,
    addChat: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    markChatRead: PropTypes.func.isRequired,
    loadChats: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  };

  state = {
    chatName: "",
  };

  handleAddChatClick = () => {
    this.onAddChat();
  };

  handleChatNameChange = (event) => {
    this.setState(() => ({
      chatName: event.target.value,
    }));
  };

  onAddChat = () => {
    const { chats, addChat } = this.props;

    const id = Number(Object.keys(chats).pop()) + 1;

    addChat({
      id: id || 1,
      title: this.state.chatName,
    });

    this.setState({
      chatName: "",
    });
  };

  handleChatNameKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.onAddChat();
    }
  };

  handleLinkClick = (link) => {
    this.props.push(link);
  };

  handleDeleteChat = (chatId) => {
    const { chats } = this.props;
    this.props.deleteChat(chatId, chats[chatId].messageList);
  };

  componentDidMount() {
    this.props.loadChats();
  }

  componentDidUpdate(prevProps) {
    const { chatId, markChatRead } = this.props;

    if (chatId && prevProps.chatId !== chatId) {
      markChatRead(chatId);
    }
  }

  render() {
    const { chats, chatId, isLoading } = this.props;
    const { chatName } = this.state;

    if (isLoading) {
      return <CircularProgress />;
    }

    return (
      <div className="chat-list">
        <List>
          {Object.entries(chats).map(([id, value]) => (
            <ListItem
              key={id}
              button
              selected={id === chatId}
              onClick={() => {
                this.handleLinkClick(`/chat/${id}`);
              }}
            >
              <Avatar className="chat-list-avatar">
                {value.title.split(" ").map((w) => w.charAt(0))}
              </Avatar>
              <ListItemText primary={value.title} />
              {value.unread && <div className="chat-list-unread" />}
            </ListItem>
          ))}
          <ListItem
            button
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              type="text"
              autoFocus
              placeholder="Добавить новый чат"
              value={chatName}
              onChange={this.handleChatNameChange}
              onKeyUp={this.handleChatNameKeyUp}
              style={{ width: "85%" }}
            />
            <Fab disabled={!chatName} onClick={this.handleAddChatClick}>
              <SendIcon />
            </Fab>
          </ListItem>
          <ListItem>
            <ListItemText primary={`Удалить текущий чат`} />
            <IconButton
              aria-label="delete"
              onClick={() => {
                this.handleDeleteChat(chatId);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        </List>
      </div>
    );
  }
}
