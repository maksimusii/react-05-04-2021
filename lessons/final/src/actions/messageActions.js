import { createAction } from 'redux-api-middleware'
import { normalize } from 'normalizr';
import { messages } from '../utils/schemes';
export const LOAD_MESSAGES_REQUEST = '@@message/LOAD_MESSAGES_REQUEST';
export const LOAD_MESSAGES_SUCCESS = '@@message/LOAD_MESSAGES_SUCCESS';
export const LOAD_MESSAGES_ERROR = '@@message/LOAD_MESSAGES_ERROR';
export const SEND_MESSAGE_REQUEST = '@@message/SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = '@@message/SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_ERROR = '@@message/SEND_MESSAGE_ERROR';
export const DELETE_MESSAGE_REQUEST = '@@message/DELETE_MESSAGE_REQUEST';
export const DELETE_MESSAGE_SUCCESS = '@@message/DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_ERROR = '@@message/DELETE_MESSAGE_ERROR';
export const DELETE_MESSAGES_BY_CHAT_REQUEST = '@@message/DELETE_MESSAGES_BY_CHAT_REQUEST';
export const DELETE_MESSAGES_BY_CHAT_SUCCESS = '@@message/DELETE_MESSAGES_BY_CHAT_SUCCESS';
export const DELETE_MESSAGES_BY_CHAT_ERROR = '@@message/DELETE_MESSAGES_BY_CHAT_ERROR';

export const loadMessages = (chatId) => {
    return createAction({
        endpoint: `/api/messages?chatId=${chatId}`,
        method: 'GET',
        types: [
            LOAD_MESSAGES_REQUEST,
            {
                type: LOAD_MESSAGES_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();

                    return normalize(json, [messages]);
                },
            },
            LOAD_MESSAGES_ERROR
        ]
    });
};

export const sendMessage = ({ chatId, text, sender, isBot, currentChatId }) => {
    return createAction({
        endpoint: '/api/messages',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            chatId,
            text,
            sender
        }),
        types: [
            {
                type: SEND_MESSAGE_REQUEST,
                payload: {
                    isBot
                }
            },
            {
                type: SEND_MESSAGE_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();

                    return {
                        messageId: json.messageId,
                        isBot,
                        currentChatId,
                        chatId,
                        text,
                        sender
                    };
                }
            },
            SEND_MESSAGE_ERROR
        ]
    });
};

export const deleteMessage = (id) => {
    return createAction({
        endpoint: `/api/messages/${id}`,
        method: 'DELETE',
        types: [
            {
                type: DELETE_MESSAGE_REQUEST,
                payload: { id }
            },
            {
                type: DELETE_MESSAGE_SUCCESS,
                payload: { id },
            },
            DELETE_MESSAGE_ERROR
        ]
    });
};

export const deleteMessagesByChat = (chatId) => {
    return createAction({
        endpoint: `/api/messages?chatId=${chatId}`,
        method: 'DELETE',
        types: [
            DELETE_MESSAGES_BY_CHAT_REQUEST,
            DELETE_MESSAGES_BY_CHAT_SUCCESS,
            DELETE_MESSAGES_BY_CHAT_ERROR
        ]
    });
};
