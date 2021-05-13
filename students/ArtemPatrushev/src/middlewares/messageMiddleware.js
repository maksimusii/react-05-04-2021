import { SEND_MESSAGE, sendMessage } from "../Actions/messageAction.js";
import { markChatUnread, markChatRead } from '../Actions/chatActions.js';
import { matchPath } from 'react-router-dom';
import {CHAT_PATTERN} from '../constants/index.js';

export default store => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            const {chatId, author} = action;
            
            if (action.author === 'me') {
                setTimeout(() => {
                    const state = store.getState();
                    const { messages } = state.messageReducer;
                    const { chats } = state.chatReducer;
                    const { firstName } = state.profileReducer.profile;
                    const lastMessageId = Number(Object.keys(messages).pop());
                    const messageId = lastMessageId + 1;
                    const author = chats[chatId].title;
                    debugger;
                    const botAction = sendMessage({
                        messageId,
                        chatId,
                        text: `Hi, ${firstName}! I'm ${author}.`,
                        author: 'bot'
                    });

                    store.dispatch(botAction);
                }, 1000);
            }

            if (author !== 'me') {
                store.dispatch(markChatUnread(chatId));

                setTimeout(() => {
                    const {pathname} = store.getState().router.location;  
                    const {params} = matchPath(pathname, {
                        path: CHAT_PATTERN,
                        exact: true
                    });

                    if (chatId === params.id) {
                        store.dispatch(markChatRead(chatId));
                    }
                }, 1000);
            }
    }
    return next(action);
}

// store.getState(); всегда выдает актуальный на данный момент state (то есть тот state, что вызван выше, отличается от того, который вызван ниже, тк он уже изменился)
