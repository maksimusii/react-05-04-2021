import React from 'react';
import PropTypes from 'prop-types';
import s from './Message.module.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Message extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        messageId: PropTypes.number.isRequired,
        chatId: PropTypes.string.isRequired
    }

    deleteMessageClick = () => {
        const {chatId, messageId} = this.props;

        this.props.deleteMessage({
            messageId,
            chatId
        })
    }

    render() {
        


        return (
            <div className={s.messageBox} style={{ alignSelf: this.props.author === 'bot' ? 'flex-start' : 'flex-end' }} >
                <div className={s.message}>
                    <div>{this.props.text}</div>
                    <div className={s.messageSender}>{this.props.author}</div>
                </div>
                <IconButton aria-label="delete"
                    onClick={this.deleteMessageClick}>
                    <DeleteIcon />
                </IconButton>
            </div>
        )
    }
}