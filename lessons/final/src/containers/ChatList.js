import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { addChat, markChatRead, loadChats, deleteChat } from '../actions/chatActions';
import ChatList from '../components/ChatList';

const mapStateToProps = (store) => {
    return store.chatReducer;
};

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteChat,
    loadChats,
    markChatRead,
    addChat,
    push
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
