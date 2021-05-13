import { bindActionCreators } from "redux";
import { addChat, loadChats } from "../actions/chatActions";
import { connect } from "react-redux";
import ChatList from "../components/ChatList/ChatList";
import { push } from "connected-react-router";

const mapStateToProps = ({ chatReducer }) => ({
  chats: chatReducer.chats,
  isLoading: chatReducer.isLoading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addChat, loadChats, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
