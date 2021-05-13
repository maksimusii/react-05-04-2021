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
        isSending: PropTypes.bool,
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

        const { chatId } = this.props;

        this.props.sendMessage({
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
        const { messages, isLoading, isSending } = this.props;

        const messageElements = Object.values(messages).map(({ id, text, sender, isDeleting }) => {
            return (
                <Message
                    key={id}
                    messageId={id}
                    text={text}
                    isDeleting={isDeleting}
                    sender={sender} />
            )
        });

        return (
            <>
                <div ref={this.messageFieldRef} className="message-field">
                    { isLoading ? <CircularProgress /> :
                        (messageElements.length ? messageElements :
                            <div style={{color: 'black'}}>Список сообщений пуст</div>)
                    }
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
                        {isSending ? <CircularProgress size={20}/> : <SendIcon /> }
                    </Fab>
                </div>
            </>
        )
    }
}
