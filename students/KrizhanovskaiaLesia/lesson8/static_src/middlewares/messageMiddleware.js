import { SEND_MESSAGE, sendMessage } from "../actions/messageActions";
// import { GLOW_CHAT } from "../actions/chatActions";


export default store => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            if (action.sender === 'me') {
                setTimeout(() => {
                    const { chatId } = action;
                    const state = store.getState();
                    const { messages } = state.messageReducer;
                    const { chats } = state.chatReducer;
                    const { firstName } = state.profileReducer;
                    const messageId = Object.keys(messages).length + 1;
                    const sender = chats[chatId].title;

                    const botAction = sendMessage({
                        messageId,
                        chatId,
                        text: `Привет, ${firstName}! Я ${sender}.`,
                        sender: 'bot'
                    });

                    store.dispatch(botAction);
                }, 1000);
            }
            // case GLOW_CHAT:

    }
    return next(action);
}
