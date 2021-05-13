import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, CircularProgress } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import './style.css';

export default class Message extends React.Component {
    static propTypes = {
        messageId: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        sender: PropTypes.string.isRequired,
        isDeleting: PropTypes.bool,
        deleteMessage: PropTypes.func.isRequired
    };

    handleDeleteMessageClick = () => {
        const { messageId } = this.props;

        this.props.deleteMessage(messageId)
    };

    render() {
        const { text, sender, isDeleting } = this.props;
        const isBot = sender === 'bot';
        const deleteButtonStyle = {
            [isBot ? 'right' : 'left']: -48
        };

        return (
            <div className="message-wrapper">
                <div
                    className="message"
                    style={ { alignSelf: isBot ?
                            'flex-start' : 'flex-end' } }
                >
                    <div>{ text }</div>
                    <div className="message-sender">{ sender }</div>
                    { isDeleting ? <CircularProgress
                        size={20}
                        className="message-deleting"
                        style={deleteButtonStyle} /> : (
                        <IconButton
                            style={deleteButtonStyle}
                            className="message-delete"
                            onClick={this.handleDeleteMessageClick}>
                            <Delete />
                        </IconButton>
                    )}
                </div>
            </div>
        )
    }
}
