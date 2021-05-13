import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout.jsx';
import Profile from '../containers/Profile.js';
import MessageField from '../containers/MessageField.js';
import ChatList from '../containers/ChatList.js';
import {CHAT_PATTERN} from '../constants/index.js';


export default class Router extends React.Component {
    static propTypes = {
        chats: PropTypes.object.isRequired,
        chatId: PropTypes.string,
    };
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => (
                    <Redirect to='/profile' />
                )} />  
                <Route exact path={CHAT_PATTERN} render={(props) => {
                    const chatId = props.match.params.id;
                    return (
                        <Layout
                            chatId={chatId}
                            title={`Messages: ${this.props.chats[chatId]?.title}`}>
                            <div>
                                <ChatList
                                    chatId={chatId} />
                            </div>
                            <MessageField chatId={chatId} />
                        </Layout>
                    ) 
                }} />
                <Route path='/profile' render={() => (
                    <Layout title='Profile Page'>
                        <Profile />
                    </Layout>
                )} />
            </Switch>
        )
        debugger;
    }
}