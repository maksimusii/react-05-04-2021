import { DELETE_MESSAGE, SEND_MESSAGE } from '../actions/messageActions';
import {
    DELETE_CHAT_REQUEST,
    DELETE_CHAT_SUCCESS,
    ADD_CHAT_REQUEST,
    ADD_CHAT_SUCCESS,
    MARK_CHAT_UNREAD,
    MARK_CHAT_READ,
    LOAD_CHATS_REQUEST,
    LOAD_CHATS_SUCCESS,
    LOAD_CHATS_ERROR
} from '../actions/chatActions';

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
            const newChats = { ...chats };

            delete newChats[action.payload.id];

            return {
                ...store,
                chats: newChats
            };
        }
        case ADD_CHAT_REQUEST: {
            return {
                ...store,
                isAdding: true
            };
        }
        case ADD_CHAT_SUCCESS: {
            const { id, title } = action.payload;

            return {
                ...store,
                isAdding: false,
                chats: {
                    ...store.chats,
                    [id]: {
                        title: title,
                        messageList: []
                    }
                },
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
        case DELETE_MESSAGE: {
            const { messageId, chatId } = action;
            const messageList = store.chats[chatId].messageList;
            const newMessageList = messageList.filter((mId) => mId !== messageId);

            return {
                ...store,
                chats: {
                    ...store.chats,
                    [chatId]: {
                        ...store.chats[chatId],
                        messageList: newMessageList
                    }
                }
            }
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
                isLoading: false
            };
        }
        case LOAD_CHATS_SUCCESS: {
            const { chats = {} } = action.payload.entities;

            Object.keys(chats).forEach((id) => {
                chats[id].messageList = [];
            });

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