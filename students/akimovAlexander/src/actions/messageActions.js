import { createAction } from 'redux-api-middleware'
import { normalize } from 'normalizr';
import { messages } from '../utils/schemes';
export const SEND_MESSAGE = '@@message/SEND_MESSAGE';
export const DELETE_MESSAGE = '@@message/DELETE_MESSAGE';
export const LOAD_MESSAGES_REQUEST = '@@message/LOAD_MESSAGES_REQUEST';
export const LOAD_MESSAGES_SUCCESS = '@@message/LOAD_MESSAGES_SUCCESS';
export const LOAD_MESSAGES_ERROR = '@@message/LOAD_MESSAGES_ERROR';

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

export const sendMessage = ({ messageId, chatId, text, sender }) => ({
    type: SEND_MESSAGE,
    messageId,
    chatId,
    text,
    sender
});

export const deleteMessage = ({ messageId, chatId }) => ({
    type: DELETE_MESSAGE,
    messageId,
    chatId
});