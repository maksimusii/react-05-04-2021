
import { 
    SEND_MESSAGE,
    DELETE_MESSAGES,
    LOAD_MESSAGES_REQUEST,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_ERROR
 } from "../actions/messageActions";

const initialStore = {
  messages: {},
  isLoading: false
};
export default function messageReducer(store = initialStore, action) {
  switch (action.type) {
      case SEND_MESSAGE: {
          const { text, userName } = action;
          return {
              messages: {
                  ...store,
                  messages,
                  ...store.messages,
                  [messageId]: {
                      text,
                      userName
                  }
              }
          };
      }
      case LOAD_MESSAGES_REQUEST: {
        return {
            ...store,
            isLoading: true
        }
    }
    case LOAD_MESSAGES_ERROR: {
        return {
            ...store,
            isLoading: false
        }
    }
    case LOAD_MESSAGES_SUCCESS: {
        const { messages = {} } = action.payload.entities;

        return {
            ...store,
            isLoading: false,
            messages
        }
    }
      default:
          return store;
  }
}
