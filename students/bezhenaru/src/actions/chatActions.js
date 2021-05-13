import { createAction } from 'redux-api-middleware'
import { normalize } from 'normalizr';
import { chats } from '../utils/schemes';

export const ADD_CHAT_REQUEST = '@@chat/ADD_CHAT_REQUEST';
export const ADD_CHAT_SUCCESS = '@@chat/ADD_CHAT_SUCCESS';
export const ADD_CHAT_ERROR = '@@chat/ADD_CHAT_ERROR';
export const DELETE_CHAT_REQUEST = '@@chat/DELETE_CHAT_REQUEST';
export const DELETE_CHAT_SUCCESS = '@@chat/DELETE_CHAT_SUCCESS';
export const DELETE_CHAT_ERROR = '@@chat/DELETE_CHAT_ERROR';
export const MARK_CHAT_UNREAD = '@@chat/MARK_CHAT_UNREAD';
export const MARK_CHAT_READ = '@@chat/MARK_CHAT_READ';
export const LOAD_CHATS_REQUEST = '@@chat/LOAD_CHATS_REQUEST';
export const LOAD_CHATS_SUCCESS = '@@chat/LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_ERROR = '@@chat/LOAD_CHATS_ERROR';

export const deleteChat = (id) => {
    return createAction({
        endpoint: `/api/chats/${id}`,
        method: 'DELETE',
        types: [
            {
                type: DELETE_CHAT_REQUEST,
                payload: { id }
            },
            {
                type: DELETE_CHAT_SUCCESS,
                payload: { id },
            },
            DELETE_CHAT_ERROR
        ]
    });
};

export const addChat = ({ id, title }) => {
    return createAction({
        endpoint: '/api/chats',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ id, title }),
        types: [
            ADD_CHAT_REQUEST,
            {
                type: ADD_CHAT_SUCCESS,
                payload: { id, title },
            },
            ADD_CHAT_ERROR
        ]
    });
};

export const markChatUnread = (chatId) => {
    return {
        type: MARK_CHAT_UNREAD,
        chatId,
    }
};

export const markChatRead = (chatId) => {
    return {
        type: MARK_CHAT_READ,
        chatId,
    }
};

export const loadChats = () => {
    return createAction({
        endpoint: '/api/chats',
        method: 'GET',
        types: [LOAD_CHATS_REQUEST, {
            type: LOAD_CHATS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();

                return normalize(json, [chats]);
            },
        } , LOAD_CHATS_ERROR]
    });
};
