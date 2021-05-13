import { deleteMessagesByChat, SEND_MESSAGE_SUCCESS, sendMessage } from "../actions/messageActions";
import { markChatUnread, markChatRead, DELETE_CHAT_SUCCESS } from '../actions/chatActions';
import { matchPath } from 'react-router-dom';
import { push } from 'connected-react-router';
import { CHAT_PATTERN } from '../constants';

export default store => next => (action) => {
    switch (action.type) {
        case DELETE_CHAT_SUCCESS: {
            const { id } = action.payload;
            const { pathname } = store.getState().router.location;
            const { params } = matchPath(pathname, {
                path: CHAT_PATTERN,
                exact: true,
            });
            const currentChatId = params.id;

            if (id === currentChatId) {
                store.dispatch(push('/profile'));
            }

            store.dispatch(deleteMessagesByChat(id));
            break;
        }
        case SEND_MESSAGE_SUCCESS: {
            const { chatId, sender } = action.payload;

            if (sender === 'me') {
                setTimeout(() => {
                    const state = store.getState();
                    const { chats } = state.chatReducer;
                    const { firstName } = state.profileReducer;
                    const { pathname } = store.getState().router.location;
                    const { params } = matchPath(pathname, {
                        path: CHAT_PATTERN,
                        exact: true,
                    });
                    const currentChatId = params.id;
                    const sender = chats[chatId].title;

                    const botAction = sendMessage({
                        isBot: true,
                        currentChatId,
                        chatId,
                        text: `Привет, ${firstName}! Я ${sender}.`,
                        sender: 'bot'
                    });

                    store.dispatch(botAction);
                }, 2000);
            }

            if (sender !== 'me') {
                store.dispatch(markChatUnread(chatId));

                setTimeout(() => {
                    const { pathname } = store.getState().router.location;
                    const { params } = matchPath(pathname, {
                        path: CHAT_PATTERN,
                        exact: true,
                    });

                    if (chatId === params.id) {
                        store.dispatch(markChatRead(chatId));
                     }
                }, 1000);
            }
        }
    }
    return next(action);
}
