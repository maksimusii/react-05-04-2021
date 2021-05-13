import React from 'react';
import Message from '../Message.jsx';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class MessageField extends React.Component {
  static propTypes = {
    chatId: PropTypes.string,
    chats: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.messageFieldRef = React.createRef();
  }
  
  state = {
    input: ''
  };
  
  static defaultProps = {
    chatId: '1'
  }
  
  componentDidMount() {
    const {chatId, loadMessages} = this.props;
    loadMessages(chatId);
  }
  componentDidUpdate(prevProps) {
    const {chatId, loadMessages} = this.props;
    
    if (prevProps.chatId !== chatId) {
      loadMessages(chatId);
  }
  if (this.messageFieldRef.current != null) {
    this.messageFieldRef.current.scrollTop = 
    this.messageFieldRef.current.scrollHeight - this.messageFieldRef.current.clientHeight;
  }
  }

  handleInputKeyUp = (event) => {
    if(this.state.input) {
      if(event.keyCode === 13) {
        this.sendMessage();
      }
    }
  }
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }
  sendMessage = () => {
    const { chatId, messages } = this.props;

    const messageId = Object.entries(messages).length + 1;

    this.props.sendMessage(
      messageId, 
      this.state.input, 
      'Вася', 
      chatId);
    this.setState({
      input: '' 
    })
  }
  render() {
    
    const { chatId, messages, isLoading } = this.props;
   
    if (isLoading) {
      return <CircularProgress />
    }
    const messageElements = Object.entries(messages).map(([messageId, message]) => {
      const { text, userName } = message;

      return (
          <Message
              key={messageId}
              chatId={chatId}
              messageId={messageId}
              text={text}
              userName={userName} />
      )
  });

  
     
    return (
      <>
        <div ref={this.messageFieldRef} className='message-field'>
          { messageElements }
        </div>
        <div className="actions">
          <TextField
            style={{ marginRight: '12px', marginLeft: '12px' }}
            fullWidth
            placeholder="введите сообщение"
            type="text"
            autoFocus
            value={this.state.input} 
            onChange={this.handleChange}
            onKeyUp={this.handleInputKeyUp} />
          <Fab
            color="primary" 
            aria-label="add"
            disabled={!this.state.input}
            onClick={this.sendMessage}>
            <SendIcon />
          </Fab>
        </div>
      </> )
    }
} 

