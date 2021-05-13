import React from 'react';
import Message from './message/index.jsx';
import TextField from '@material-ui/core/TextField';
// import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import '../styles/app.css';

export default class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
        chats: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired
    };

    state = {
        input: ''
    };

    constructor(props) {
        super(props);

        this.messageFieldRef = React.createRef();
    }

    componentDidUpdate() {
        this.messageFieldRef.current.scrollTop =
            this.messageFieldRef.current.scrollHeight - this.messageFieldRef.current.clientHeight;
    }

    sendMessage = () => {
        const { input } = this.state;

        if (!input) {
            return;
        }

        const { chatId, messages } = this.props;
        const messageId = Object.keys(messages).length + 1;

        this.props.sendMessage({
            messageId,
            chatId,
            text: input,
            sender: 'me'
        });

        this.setState({
            input: ''
        });

        setTimeout(() => {
            const { messages } = this.props;
            const messageId = Object.keys(messages).length + 1;

            this.props.sendMessage({
                messageId,
                chatId,
                text: 'Я робот!',
                sender: 'bot'
            });
        }, 1000);
    };

    handleChangeInput = ({ target: { value } }) => {
        this.setState({
            input: value
        })
    };

    handleInputKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    };

    render() {
        const { chats, messages, chatId } = this.props;

        const messageElements = chats[chatId].messageList.map((messageId) => {
            const { text, sender } = messages[messageId];

            return (
                <Message
                    key={messageId}
                    text={text}
                    sender={sender} />
            )
        });

        return (
            <>
                <div ref={this.messageFieldRef} className="message-field">
                    { messageElements }
                </div>
                <div className='actions'>
                    <TextField
                        style={{ marginRight: '12px' }}
                        placeholder='Введите сообщение'
                        fullWidth
                        value={this.state.input}
                        type="text"
                        autoFocus
                        onKeyUp={this.handleInputKeyUp}
                        onChange={this.handleChangeInput} />
                    <Fab
                        color='primary'
                        disabled={this.state.input === ''}
                        onClick={this.sendMessage}>
                        {/* <SendIcon /> */}
                    </Fab>
                </div>
            </>
        )
    }
}