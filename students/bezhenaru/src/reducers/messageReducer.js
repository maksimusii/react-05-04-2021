import { DELETE_MESSAGE_SUCCESS,
            DELETE_MESSAGE_REQUEST,
            SEND_MESSAGE_REQUEST,
            SEND_MESSAGE_SUCCESS,
            LOAD_MESSAGES_REQUEST,
            LOAD_MESSAGES_SUCCESS,} from '../actions/messageActions';

const initialStore = {
    messages: {},
    isLoading: false,
    isSending: false
};

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE_REQUEST: {
            return {
                ...store,
                isSending: !action.payload.isRobot
            };
        }
        case SEND_MESSAGE_SUCCESS: {
            const { messageId, text, author, isRobot, currentChatId, chatId } = action.payload;

            if (isRobot && currentChatId !== chatId) {
                return store;
            }

            return {
                ...store,
                isSending: false,
                messages: {
                    ...store.messages,
                    [messageId]: {
                        id: messageId,
                        text,
                        author,
                    },
                },
            };
        } 
        case DELETE_MESSAGE_REQUEST: {
            const { id } = action.payload;

            return {
                ...store,
                messages: {
                    ...store.messages,
                    [id]: {
                        ...store.messages[id],
                        isDeleting: true
                    }
                }
            };
        }
        case DELETE_MESSAGE_SUCCESS: {
            const { id } = action.payload;
            const newMessages = { ...store.messages };
            delete newMessages[id]; 

            return {
                ...store,
                messages: newMessages
            };
        }
        case LOAD_MESSAGES_REQUEST: {
            return {
                ...store,
                isLoading: true
            };
        }
        case LOAD_MESSAGES_SUCCESS: {
            const { messages = {} } = action.payload.entities;

            return {
                ...store,
                isLoading: false,
                messages
            };
        }
        default:
            return store;
    }
}
