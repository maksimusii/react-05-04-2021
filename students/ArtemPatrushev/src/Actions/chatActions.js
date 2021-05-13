import {createAction} from 'redux-api-middleware';
import { normalize } from 'normalizr';
import { chats } from '../Utils/schemes.js';
export const ADD_CHAT = '@@chat/ADD_CHAT';
export const MARK_CHAT_READ = '@@chat/MARK_CHAT_READ';
export const MARK_CHAT_UNREAD = '@@chat/MARK_CHAT_UNREAD';
export const LOAD_CHATS_REQUEST = '@@chat/LOAD_CHATS_REQUEST';
export const LOAD_CHATS_SUCCESS = '@@chat/LOAD_CHATS_SUCCESS';
export const LOAD_CHATS_ERROR = '@@chat/LOAD_CHATS_ERROR';
export const DELETE_CHAT = '@@message/DELETE_CHAT';

// функция action creator
export const addChat = (title) => {
    return {
        type: ADD_CHAT,
        title
    }
};

export const markChatRead = (chatId) => {
    return {
        type: MARK_CHAT_READ,
        chatId
    }
};

export const markChatUnread = (chatId) => {
    return {
        type: MARK_CHAT_UNREAD,
        chatId
    }
};

// при помощи библиотеки redux-api-middleware мы можем не создавать 3 отдельных action, а вписать их все здесь
export const loadChats = () => {
    return createAction({
        endpoint: '/api/chats.json',
        method: 'GET',
        types: [LOAD_CHATS_REQUEST, {
            type: LOAD_CHATS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                // debugger;

                return normalize(json, [chats]);
            },
        }, LOAD_CHATS_ERROR]
    });
};

export const deleteChat = (chatId) => {
    debugger;
    return {
        type: DELETE_CHAT,
        chatId
    }
};