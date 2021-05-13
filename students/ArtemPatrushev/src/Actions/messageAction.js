export const SEND_MESSAGE = '@@message/SEND_MESSAGE';
export const DELETE_MESSAGE = '@@message/DELETE_MESSAGE';

// import { normalize } from 'normalizr';
// import { messages } from '../utils/schemes';

// export const loadMessages = (chatId) => {
//     return createAction({
//         endpoint: `/api/messages?chatId=${chatId}`,
//         method: 'GET',
//         types: [
//             LOAD_MESSAGES_REQUEST,
//             {
//                 type: LOAD_MESSAGES_SUCCESS,
//                 payload: async (action, state, res) => {
//                     const json = await res.json();

//                     return normalize(json, [messages]);
//                 },
//             },
//             LOAD_MESSAGES_ERROR
//         ]
//     });
// };

export const sendMessage = ({messageId, text, author, chatId}) => {
    console.log(chatId);
    return ({
        type: SEND_MESSAGE,
        messageId,
        text,
        author,
        chatId
    });
}

export const deleteMessage = ({messageId, chatId}) => ({
    type: DELETE_MESSAGE,
    messageId,
    chatId
});
