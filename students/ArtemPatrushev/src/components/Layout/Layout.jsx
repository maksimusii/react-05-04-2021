import React from 'react';
import PropTypes from 'prop-types';
import ChatList from '../../containers/ChatList.js';
import Header from '../../containers/Header.js';
import s from './Layout.module.css';
import SideBar from '../sideBar/sideBar.jsx';

export default class Layout extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    };

    render() {

        const { children, title } = this.props;
        console.log(title)
        // const { chatId, chats } = this.props;
        // const { messages } = this.props;

        // const activeMessages = chats[chatId].messageList.map((messageId) => {
        //     return messages[messageId];
        // });

        return (
            <div className={s.layout}> 
                <Header title={title} />
                <div className={s.container}>
                    <SideBar />
                    <div className={s.messagerContainer} >
                        {/* <div>
                            <ChatList
                                chatId={chatId} />
                        </div> */}
                        { children }
                        {/* <MessageField 
                            // messages={activeMessages}
                            /*onSendNewMessage={this.handleSendNewMessage}*/}
                    </div>
                </div>
            </div>
        );
    };
}