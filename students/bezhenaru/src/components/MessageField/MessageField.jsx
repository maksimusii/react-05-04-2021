import React from 'react';
import PropTypes from 'prop-types';
import './messagefield.css';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { CircularProgress } from '@material-ui/core';
import Message from '../../containers/Message';

export default class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
        messages: PropTypes.object.isRequired,
        isLoading: PropTypes.bool,
        sendMessage: PropTypes.func.isRequired,
        loadMessages: PropTypes.func.isRequired,
        isSending: PropTypes.bool,

    };
    state = {
        input: '',
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
        const { input } = this.state;

        if (!input) {
            return;
        }

        const { chatId } = this.props;
        
        this.props.sendMessage({
            chatId,
            text: input,
            author: 'я',
        });

        this.setState({
            input: '',
        });
    };
    
    
    handleChangeInput = ({ target: { value } }) => {
        this.setState({
            input: value,
        });
    };

    handleInputKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    };

    render() {
        const { messages, isLoading, isSending } = this.props;

         const messageElements = Object.values(messages).map(({ id, text, author, isDeleting }) => {

            return (
                <Message
                    key={id}
                    messageId={id}
                    text={text}
                    isDeleting={isDeleting}
                    author={author} />
            )
        });

        return (
            <>
                <div ref={this.messageFieldRef} className='message-field'>
                { isLoading ? <CircularProgress /> :   (messageElements.length ? messageElements :
                            <div style={{color: 'black'}}>Список сообщений пуст</div>)
                    }
                </div>
                <div className='actions'>
                    <TextField
                        style={{ marginRight: '12px' }}
                        placeholder='Введите сообщение'
                        fullWidth
                        value={this.state.input}
                        type='text'
                        autoFocus
                        onKeyUp={this.handleInputKeyUp}
                        onChange={this.handleChangeInput}
                    />
                    <Fab
                        color='primary'
                        disabled={this.state.input === ''}
                        onClick={this.sendMessage}>
                        {isSending ? <CircularProgress size={20}/> : <SendIcon /> }
                    </Fab>
                </div>
            </>
        );
    }
}
