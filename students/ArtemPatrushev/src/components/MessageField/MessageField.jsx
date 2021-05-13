import React from 'react';
import Message from '../../containers/Message.js';
import PropTypes from 'prop-types';
import s from './MessageField.module.css';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';


export default class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.string.isRequired,
        chats: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired
    };

    state = {
        input: '' // определяем input для компонента
    };

    constructor(props) {
        super(props);

        this.messageFieldRef = React.createRef();
    };

    componentDidUpdate() {
        this.messageFieldRef.current.scrollTop = this.messageFieldRef.current.scrollHeight - this.messageFieldRef.current.clientHeight;
    };

    // данная функция по отпровки сообщения обчно делается отдельно, а функции-hadle (которые прописаны ниже), вызывают эту функцию + могут ставить условия
    onSendNewMessage = () => {
        const { input } = this.state;

        if(!input) {
            return;
        }

        const { chatId, messages } = this.props;
        const lastMessageId = Number(Object.keys(messages).pop());   // с помощью данного метода берем идентификатор нашего последнего сообщения
        const messageId = lastMessageId + 1;

        this.props.sendMessage({
            messageId,
            chatId,
            text: input,
            author: 'me'
        });

        this.setState({
            input: ''
        });

        // setTimeout(() => {
        //     const { messages } = this.props;
        //     const messageId = Object.keys(messages).length + 1;

        //     this.props.sendMessage({
        //         messageId,
        //         chatId,
        //         text: 'I\'m robot',
        //         author: 'bot'
        //     });
        // }, 1000);
    };

    handleClick = () => {
        this.onSendNewMessage();
    };

    handleInputKeyUp = (event) => {
        if (event.keyCode === 13) { // берем событие, проверяем на какой клавише оно произошло (по коду клавиши (нужно гуглить)), 13 - код enter
            this.onSendNewMessage();
        }
    };

    handleChangeInput = (/*event*/ { target: { value } }) => {
        this.setState({
            input: /*event.target.value*/ value // меянем state класса компонента, через прослушивание input 
        });
    };

    render() {

        const { chatId, chats, messages } = this.props;     // или так: const chatId = this.props.chatId;
        // console.log(dvjbd);

        // if (!chatId) {
        //     return <div className={s.emptyChat}>Check a chat</div>;  // если данное условие подходит, то рендерится эта разметка
        // }

        const messageElements = chats[chatId]?.messageList.map((messageId) => {
            const { text, author } = messages[messageId];

            return (
                <Message
                    key={messageId}
                    text={text}
                    author={author}
                    chatId={chatId}
                    messageId={messageId} />
            )
        });

        return (

            <div className={s.messageFieldWrapper}>
                <div ref={this.messageFieldRef} className={s.messageField}>
                    {messageElements}
                </div>
                <div className={s.actionInputBlock}>
                    <TextField                                      // это специальный тег от библиотеки material UI
                        className={s.textField}
                        value={this.state.input}                    // считываем значение инпута в state класса компонента
                        autoFocus
                        fullWidth
                        placeholder='Введите сообщение'
                        onKeyUp={this.handleInputKeyUp}              // событие отпущенной клавиши, ставится на input, т.к. фокус именно на нем
                        onChange={this.handleChangeInput} />
                    <Fab
                        disabled={this.state.input === ''}          // если в инпуте ничего не прописано, то кнопка не активна
                        onClick={this.handleClick}
                    >
                        <SendIcon />
                    </Fab>
                </div>
            </div>
        );
    };
}