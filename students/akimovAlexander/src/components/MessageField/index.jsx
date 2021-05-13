import React from 'react';
import Message from '../../containers/Message';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import './style.css';

export default class MessageField extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        chatId: PropTypes.string.isRequired,
        messages: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
        loadMessages: PropTypes.func.isRequired
    };

    state = {
        input: ''
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
            this.messageFieldRef.current.scrollHeight - this.messageFieldRef.current.clientHeight;
    }

    sendMessage = () => {
        const { input } = this.state;

        if (!input) {
            return;
        }

        const { chatId, messages } = this.props;
        const lastMessageId = Number(Object.keys(messages).pop());
        const messageId = lastMessageId + 1;

        this.props.sendMessage({
            messageId,
            chatId,
            text: input,
            sender: 'me'
        });

        this.setState({
            input: ''
        });
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
        const { messages, chatId, isLoading } = this.props;

        const messageElements = Object.entries(messages).map(([messageId, message]) => {
            const { text, sender } = message;

            return (
                <Message
                    key={messageId}
                    chatId={chatId}
                    messageId={messageId}
                    text={text}
                    sender={sender} />
            )
        });

        return (
            <>
                <div ref={this.messageFieldRef} className="message-field">
                    {isLoading ? <CircularProgress /> : messageElements}
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
                        <SendIcon />
                    </Fab>
                </div>
            </>
        )
    }
}