import React from 'react';
import PropTypes from 'prop-types';
import './message.css';
import { CircularProgress } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

export default class Message extends React.Component {
    static propTypes = {
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        messageId: PropTypes.number.isRequired,
        deleteMessage: PropTypes.func.isRequired,
        isDeleting: PropTypes.bool,

    };

    handleDeleteMessageClick = () => {
        const { messageId } = this.props;

        this.props.deleteMessage( messageId )
    };

    render() {
        const { text, author, isDeleting} = this.props;
        const isRobot = author === 'Robot';
        const deleteButtonStyle = {
            [isRobot ? 'right' : 'left']: -48,
        };

        return (
            <div className='message-wrapper'>
                <div
                    className='message'
                    style={{
                        alignSelf:  isRobot ? 'flex-start' : 'flex-end'
                    }}
                >
                    <div>{text}</div>
                    <div className='message-author'>{author}</div>
                    { isDeleting ? <CircularProgress
                        size={20}
                        className="message-deleting"
                        style={deleteButtonStyle} /> : (
                        <div
                            style={deleteButtonStyle}
                            className="message-delete"
                            onClick={this.handleDeleteMessageClick}>
                            <Delete />
                        </div>
                    )}                  
                </div>
            </div>
        )
    }
}
