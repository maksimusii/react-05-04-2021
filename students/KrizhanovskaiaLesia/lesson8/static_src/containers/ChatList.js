import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addChat } from '../actions/chatActions.js';
import ChatList from '../components/ChatList.jsx';

const mapStateToProps = (store) => {
    return {
        chats: store.chatReducer.chats,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    addChat
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);