
export const SEND_MESSAGE = '@@message/SEND_MESSAGE';

export const sendMessage = ({ messageId, chatId, text, sender }) => ({
    type: SEND_MESSAGE,
    messageId,
    chatId,
    text,
    sender
});