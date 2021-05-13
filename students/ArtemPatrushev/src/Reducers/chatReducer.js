import { SEND_MESSAGE, DELETE_MESSAGE } from '../Actions/messageAction.js';
import { 
    ADD_CHAT,
    DELETE_CHAT,
    MARK_CHAT_UNREAD, 
    MARK_CHAT_READ, 
    LOAD_CHATS_REQUEST, 
    LOAD_CHATS_SUCCESS, 
    LOAD_CHATS_ERROR 
} from "../Actions/chatActions.js";

const initialStore = {
    chats: {
        // 1: { title: 'Chat 1', messageList: [1] },
        // 2: { title: 'Chat 2', messageList: [2] },
        // 3: { title: 'Chat 3', messageList: [3] }
    },
    isLoading: false 
};


export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            // const messageId = Object.keys(this.state.messages).length + 1;
            const { chatId, messageId } = action;

            return {
                chats: {
                    ...store.chats,
                    [chatId]: {
                        ...store.chats[chatId],
                        messageList: [
                            ...store.chats[chatId].messageList,
                            messageId
                        ]
                    }
                }
            };
        }
        case ADD_CHAT: {
            const chatId = Object.keys(store.chats).length + 1;
            return {
                chats: {
                    ...store.chats,
                    [chatId]: {
                        title: action.title,
                        messageList: []
                    }
                }
            };
        }
        case DELETE_CHAT: {
            const { chatId } = action;
            // делаем копию сообщений, так как нельзя напрямую изменять store
            const newChat = { ...store.chats };
            delete newChat[chatId]; // удаляем по идентификатору

            return {
                ...store,
                chats: newChat
            };
        }
        case DELETE_MESSAGE: {
            const { messageId, chatId } = action;
            const messageList = store.chats[chatId].messageList;
            const newMessageList = messageList.filter((mesId) => mesId !== messageId);

            return {
                ...store,
                chats: {
                    ...store.chats,
                    [chatId]: {
                        ...store.chats[chatId],
                        messageList: newMessageList
                    }
                }
            };
        }
        case MARK_CHAT_UNREAD: {
            const { chatId } = action;

            return {
                ...store,
                chats: {
                    ...store.chats,
                    [chatId]: {
                        ...store.chats[chatId],
                        unread: true
                    }
                }
            };
        }
        case MARK_CHAT_READ: {
            const { chatId } = action;

            return {
                ...store,
                chats: {
                    ...store.chats,
                    [chatId]: {
                        ...store.chats[chatId],
                        unread: false
                    }
                }
            };
        }
        case LOAD_CHATS_REQUEST: {
            return {
                ...store,
                isLoading: true
            };
        }
        case LOAD_CHATS_ERROR: {
            return {
                ...store,
                isLoading:  false
            };
        }
        case LOAD_CHATS_SUCCESS: {
            const chats = action.payload.entities.chats;
            
            // payload.forEach(({id, title, messageList}) => {
            //     chats[id] = {
            //         title, 
            //         messageList
            //     };
            // });

            return {
                ...store,
                chats,
                isLoading: false
            };
        }
        default:
            return store;
    }
}