import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMessage } from '../actions/messageActions.js';
import MessageField from '../components/MessageField.jsx';

const mapStateToProps = (store) => {
    return {
        chats: store.chatReducer.chats,
        messages: store.messageReducer.messages,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    sendMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);