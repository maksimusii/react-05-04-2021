import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
  addChat,
  deleteChat,
  markChatUnread,
  markChatRead,
  loadChats,
} from "../actions/chatActions";
import ChatList from "../components/ChatList";

const mapStateToProps = (store) => {
  return store.chatReducer;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addChat,
      deleteChat,
      push,
      markChatRead,
      markChatUnread,
      loadChats,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
