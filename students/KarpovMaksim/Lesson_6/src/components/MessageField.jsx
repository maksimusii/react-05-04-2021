import React from 'react';
import Message from './Message.jsx';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/messageActions';
import { bindActionCreators } from 'redux';




class MessageField extends React.Component {
  static propTypes = {
    chatId: PropTypes.string,
    chats: PropTypes.object.isRequired,
    messages: PropTypes.object,
    sendMessage: PropTypes.func.isRequired
    
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

  componentDidUpdate() {
    this.messageFieldRef.current.scrollTop = 
    this.messageFieldRef.current.scrollHeight - this.messageFieldRef.current.clientHeight;
   }
  handleInputKeyUp = (event) => {
    if(this.state.input) {
      if(event.keyCode === 13) {
        console.log('enter')
        this.sendMessage;
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
    
    const { chats, chatId } = this.props;
    if (Object.keys(chats).length === 0) {
     return <div ref={this.messageFieldRef} className='message-field'>Чатов не найдено</div>
    }
    const messageElements = chats[chatId].messageList.map((messageId) => (
      <Message 
        key={messageId} 
        userName = {this.props.messages[messageId].userName} 
        text={this.props.messages[messageId].text} 
      />));

     
    return <div>
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
    </div> 
   }
} 

const mapStateToProps = (store) => ({
  messages: store.chatReducer.messages,
  chats: store.chatReducer.chats,
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);