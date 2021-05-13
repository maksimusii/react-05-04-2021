import { connect } from 'react-redux';
import { addChat, deleteChat, loadChats } from '../actions/chatActions';
//import { loadMessages } from '../actions/messageActions';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import ChatList from '../components/ChatList'

const mapStateToProps = (store) => {
  return store.chatReducer;
};
const mapDispatchToProps = dispatch => bindActionCreators({ 
  addChat,
  push,
  deleteChat,
  loadChats,
  //loadMessages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);