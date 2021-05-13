import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from "../components/layout/Layout.jsx";
import MessageField from '../containers/MessageField.js';
import Profile from '../containers/Profile.js';


export default class Router extends React.Component {
    static propTypes = {
        chats: PropTypes.object.isRequired
    };
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => (
                    <Redirect to='/profile'/>
                )} />
                <Route path='/chat/:id' render={(props) => {
                    const chatId = props.match.params.id;

                    return (
                        <Layout
                            title={`Messages: ${this.props.chats[chatId].title}`}
                            chatId={chatId}>
                            <MessageField chatId={chatId} />
                        </Layout>
                    );
                }}/>
                <Route path='/profile' render={() => (
                    <Layout title='Profile Page'>
                        <Profile />
                    </Layout>
                )} />
            </Switch>
        )
    }
}
