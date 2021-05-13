import { SEND_MESSAGE } from '../actions/messageActions';

const initialStore = {
    messages: {
        1: {
            sender: 'bot',
            text: 'Привет'
        },
        2: {
            sender: 'bot',
            text: 'Как дела?'
        }
    }
};


export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            const { messageId, text, sender } = action;

            return {
                messages: {
                    ...store.messages,
                    [messageId]: {
                        text,
                        sender
                    }
                }
            };
        }
        default:
            return store;
    }
}