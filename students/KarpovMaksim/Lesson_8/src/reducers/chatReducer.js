import { SEND_MESSAGE } from '../actions/messageActions';
import { 
    ADD_CHAT_REQUEST,
    ADD_CHAT_SUCCESS,
    ADD_CHAT_ERROR,
    MARK_CHAT_UNREAD,
    MARK_CHAT_READ,
    DELETE_CHAT_REQUEST,
    DELETE_CHAT_SUCCESS,
    DELETE_CHAT_ERROR,
    LOAD_CHATS_REQUEST,
    LOAD_CHATS_SUCCESS,
    LOAD_CHATS_ERROR
 } from "../actions/chatActions";

const initialStore = {
    chats: {},
    isLoading: false,
    isAdding: false
};


export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
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
                },
            };
        }
        case ADD_CHAT_REQUEST: {
            return {
                ...store,
                isAdding: true
            }
        }
        case ADD_CHAT_SUCCESS: {
            const { id, title } = action.payload;
            return {
                ...store,
                chats: {
                    ...store.chats,
                    [id]: {
                        title: title,
                        isRemoved: false
                    }
                },
                isAdding: false
            };
        }
        case DELETE_CHAT_REQUEST: {
            return {
                ...store,
                chats: {
                    ...store.chats,
                    [action.payload.id]: {
                        ...store.chats[action.payload.id],
                        isDeleting: true
                    }
                }
            };
        }
        case DELETE_CHAT_SUCCESS: {
            const { chats } = store;
            const newChats = {...chats}
            delete newChats[action.payload.id];
            return {
                ...store,
                chats: newChats
            }
        }
        case LOAD_CHATS_REQUEST: {
            return {
                ...store,
                isLoading: true
            }
        }
        case LOAD_CHATS_ERROR: {
            return {
                ...store,
                isLoading: false
            }
        }
        case LOAD_CHATS_SUCCESS: {
            const { chats = {} } = action.payload.entities;
            return {
                ...store,
                chats,
                isLoading: false
            }
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
            }
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
            }
        }
        default:
            return store;
    }
}
