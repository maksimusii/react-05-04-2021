import { deleteMessagesByChat, SEND_MESSAGE_SUCCESS, sendMessage } from '../actions/messageActions';
import { markChatUnread, markChatRead, DELETE_CHAT_SUCCESS } from '../actions/chatActions';
import { matchPath } from 'react-router-dom';
import { CHAT_PATTERN } from '../constants';
import { push } from 'connected-react-router';


export default (store) => (next) => (action) => {
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
        case SEND_MESSAGE_SUCCESS:{
          const { chatId, author } = action.payload;
            if (author === 'я') {
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
                    const author = chats[chatId].title;

                    const botAction = sendMessage({
                         isRobot: true,
                        currentChatId,
                        chatId,
                        text: `Привет, ${firstName}! Я ${author}.`,
                        author: author,
                    });

                    store.dispatch(botAction);
                }, 1500);
            }
            if (author !== 'я') {
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
