import { createAction } from "redux-api-middleware";
import { normalize } from "normalizr";
import { chats } from "../utils/schemes";

export const ADD_CHAT = "@@chat/ADD_CHAT";
export const SEND_MESSAGE = "@@message/SEND_MESSAGE";
export const ENABLE_CHAT_HIGHLIGHT = "@@chat/ENABLE_CHAT_HIGHLIGHT";
export const DISABLE_CHAT_HIGHLIGHT = "@@chat/DISABLE_CHAT_HIGHLIGHT";
export const LOAD_CHATS_REQUEST = "@@chat/LOAD_CHATS_REQUEST";
export const LOAD_CHATS_SUCCESS = "@@chat/LOAD_CHATS_SUCCESS";
export const LOAD_CHATS_ERROR = "@@chat/LOAD_CHATS_ERROR";

export const addChat = (title) => ({
  type: ADD_CHAT,
  title,
});

export const sendMessage = (chatId, text, sender) => ({
  type: SEND_MESSAGE,
  chatId,
  text,
  sender,
});

export const enableChatHighlight = (chatId) => ({
  type: ENABLE_CHAT_HIGHLIGHT,
  chatId,
});

export const disableChatHighlight = (chatId) => ({
  type: DISABLE_CHAT_HIGHLIGHT,
  chatId,
});

export const loadChats = () => {
  return createAction({
    endpoint: "/api/chats.json",
    method: "GET",
    types: [
      LOAD_CHATS_REQUEST,
      {
        type: LOAD_CHATS_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return normalize(json, [chats]);
        },
      },
      LOAD_CHATS_ERROR,
    ],
  });
};
