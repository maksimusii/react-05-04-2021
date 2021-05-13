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
    chatId: PropTypes.string,
    chats: PropTypes.object.isRequired,
    addChat: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    loadChats: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,

  };

  state = {
    chatName: ''
  }
  
  componentDidMount() {
    this.props.loadChats();
    this.props.loadMessages();
  }

  handlerChatNameChange = (event) => {
    this.setState({
      chatName: event.target.value
    });
  };

  handlerAddChatClick = () => {
    this.props.addChat(this.state.chatName, 1);
    this.setState( {
        chatName: ''
      }
    );
  };

  handleNavigate = (link) => {
    this.props.push(link);
  };

  hadlerDeleteChatClick = (event) => {
    this.props.deleteChat(event.currentTarget.dataset.id);
    this.handleNavigate('/');
    
  }
  render() {
    const { chatName } = this.state;
    const { chats, isLoading } = this.props;
    if (isLoading) {
      return <CircularProgress />
    }
    if (Object.keys(chats).length === 0) {
      return  <div className="chat-list-field">
        Нет чатов
        <List>
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
    }
    return (
      <div className="chat-list-field">
        <List>
        {Object.entries(chats).map(([id, value]) => 
          !value.isRemoved?(
            <ListItem key={id} button selected={id === this.props.chatId} >
              <div className='chat-list-icon' onClick={ () => this.handleNavigate(`/chat/${id}`) }></div>
              <ListItemText 
                primary={value.title} 
                onClick={ () => this.handleNavigate(`/chat/${id}`) }/>
              <IconButton  data-id={id} onClick={this.hadlerDeleteChatClick}>
                <DeleteIcon  />
              </IconButton>
            </ListItem>
            
          ): null)}
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
