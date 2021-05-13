import {
  ADD_CHAT,
  DISABLE_CHAT_HIGHLIGHT,
  ENABLE_CHAT_HIGHLIGHT,
  LOAD_CHATS_ERROR,
  LOAD_CHATS_REQUEST,
  LOAD_CHATS_SUCCESS,
  SEND_MESSAGE,
} from "../actions/chatActions";

const initialStore = {
  chats: {},
  messages: {},
  isLoading: false,
};

export default function chatReducer(store = initialStore, action) {
  const { chats, messages } = store;

  switch (action.type) {
    case SEND_MESSAGE: {
      const { chatId, text, sender } = action;
      const messageId = Object.keys(messages).length + 1;

      return {
        chats: {
          ...chats,
          [chatId]: {
            ...chats[chatId],
            messageList: [...chats[chatId].messageList, messageId],
            highlight: chats[chatId].highlight,
          },
        },
        messages: {
          ...messages,
          [messageId]: {
            text: text,
            sender: sender,
          },
        },
      };
    }
    case ADD_CHAT: {
      const chatId = Object.keys(chats).length + 1;

      return {
        chats: {
          ...chats,
          [chatId]: {
            title: action.title,
            messageList: [],
            highlight: false,
          },
        },
        messages: messages,
      };
    }
    case ENABLE_CHAT_HIGHLIGHT: {
      chats[action.chatId].highlight = true;
      return {
        chats: { ...chats },
        messages: messages,
      };
    }
    case DISABLE_CHAT_HIGHLIGHT: {
      chats[action.chatId].highlight = false;
      return {
        chats: { ...chats },
        messages: messages,
      };
    }
    case LOAD_CHATS_REQUEST: {
      return {
        ...store,
        isLoading: true,
      };
    }
    case LOAD_CHATS_SUCCESS: {
      const { chats, messages } = action.payload.entities;

      return {
        ...store,
        chats,
        messages,
        isLoading: false,
      };
    }
    case LOAD_CHATS_ERROR: {
      return {
        ...store,
        isLoading: false,
      };
    }
    default:
      return store;
  }
}
