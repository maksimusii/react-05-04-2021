import { SEND_MESSAGE, DELETE_MESSAGE } from '../Actions/messageAction.js';
// import {LOAD_MESSAGES_REQUEST, LOAD_MESSAGES_SUCCESS} from '../Actions/chatActions.js';
import { LOAD_CHATS_SUCCESS } from '../actions/chatActions';

const initialStore = {
    messages: {
        // 1: {
        //     text: 'Hi!',
        //     author: 'bot'
        // },
        // 2: {
        //     text: 'this is chat number 2',
        //     author: 'bot'
        // },
        // 3: {
        //     text: 'this is chat number 3',
        //     author: 'bot'
        // }
    },
    isLoading: false
};


export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            const { messageId, text, author } = action;

            return {
                messages: {
                    ...store.messages,
                    [messageId]: {
                        text,
                        author
                    }
                }
            };
        }
        case DELETE_MESSAGE: {
            const { messageId } = action;
            // делаем копию сообщений, так как нельзя напрямую изменять store
            const newMessages = { ...store.messages };
            delete newMessages[messageId]; // удаляем по идентификатору

            return {
                ...store,
                messages: newMessages
            };
        }
        case LOAD_CHATS_SUCCESS: {
            const {messages} = action.payload.entities;
            return {
                ...store,
                messages
            };
        }
        // case LOAD_MESSAGES_REQUEST: {
        //     return {
        //         ...store,
        //         isLoading: true
        //     };
        // }

        // case LOAD_MESSAGES_SUCCESS: {
        //     const { messages } = action.payload.entities;
        //     // const { messages = {} } = action.payload.entities;

        //     return {
        //         ...store,
        //         isLoading: false,
        //         messages
        //     };
        // }
        default:
            return store;
    }
}