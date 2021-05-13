import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import PropTypes from 'prop-types'
import Layout from '../components/Layout/Layout';
import MessageField from '../containers/MessageField';
import Profile from '../containers/Profile';
import { CHAT_PATTERN } from '../constants';


export default class Router extends React.Component {
    static propTypes = {
        chats: PropTypes.object.isRequired,
        isLoaded: PropTypes.bool

    };
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => (
                    <Redirect to='/profile'/>
                )} />
                <Route path={CHAT_PATTERN} render={(props) =>{
                    const chatId = props.match.params.id;

                    const { chats, isLoaded } = this.props;

                    if (isLoaded && !chats[chatId]) {
                        return <Redirect to='/profile' />;
                    }
                    return (
                        <Layout
                            title={`Чат: ${this.props.chats[chatId].title}`}
                            chatId={chatId}>
                            <MessageField chatId={chatId} />
                        </Layout>
                    );
                }}/>
                <Route path='/profile' render={() => (
                    <Layout title='Страница профиля'>
                        <Profile />
                    </Layout>
                )} />
            </Switch>
        )
    }
}
