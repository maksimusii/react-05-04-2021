import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class ChatList extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    isAdding: PropTypes.bool,
    chatId: PropTypes.string,
    chats: PropTypes.objectOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      unread: PropTypes.bool,
      isDeleting: PropTypes.bool,
    })).isRequired,
    addChat: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    loadChats: PropTypes.func.isRequired,
    //loadMessages: PropTypes.func.isRequired,

  };

  state = {
    chatName: ''
  }
  
  componentDidMount() {
    this.props.loadChats();
    //this.props.loadMessages();
  }

  handlerChatNameChange = (event) => {
    this.setState({
      chatName: event.target.value
    });
  };

  handlerAddChatClick = () => {
    const { chats, addChat } = this.props;
    const id = Number(Object.keys(chats).pop()) + 1;

    addChat({
      id: id || 1,
      title: this.state.chatName
      });
    this.setState( {
        chatName: ''
      }
    );
  };

  handleNavigate = (link) => {
    this.props.push(link);
  };

  hadlerDeleteChatClick = (event) => {
    event.stopPropagation();
    this.props.deleteChat(event.currentTarget.dataset.id);  
  }

  render() {
    const { chatName } = this.state;
    const { chats, isLoading, isAdding } = this.props;
    if (isLoading) {
      return <CircularProgress />
    }
    return (
      <div className="chat-list-field">
        <List>
        {Object.entries(chats).map(([id, value]) => (
          
            <ListItem 
              className='chat-list-item' 
              key={id} 
              button
              onClick={ () => this.handleNavigate(`/chat/${id}`) } 
              selected={id === this.props.chatId} >
            <div className='chat-list-icon' onClick={ () => this.handleNavigate(`/chat/${id}`) }></div>
              <ListItemText 
                primary={value.title} 
                className='chat-list-name' />
                { value.unread ? <div className='chat-list-unread' /> : 
                  value.isDeleting ? <CircularProgress size={20} /> : null 
                }
              <IconButton  className='chat-list-delete' data-id={id} onClick={this.hadlerDeleteChatClick}>
                <DeleteIcon  />
              </IconButton>
            </ListItem>   
        ))}
          {isAdding && <CircularProgress size={20} />}
          <ListItem button >
            <TextField 
              value={chatName}
              placeholder='Enter new chat name' 
              onChange={this.handlerChatNameChange}/>
            <IconButton
              onClick={this.handlerAddChatClick}
              disabled={!chatName}>
              <SendIcon />
            </IconButton>
          </ListItem>
        </List>
     
      </div>
    )
  }
}

