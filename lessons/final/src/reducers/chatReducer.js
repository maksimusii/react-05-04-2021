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
    isLoaded: false,
    isAdding: false
};

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
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
                        title: title
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

            return {
                ...store,
                chats,
                isLoading: false,
                isLoaded: true
            };
        }
        default:
            return store;
    }
}
