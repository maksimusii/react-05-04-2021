import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMessage, loadMessages } from '../actions/messageActions';
import MessageField from '../components/MessageField';

const mapStateToProps = (store) => {
    return store.messageReducer;
};

const mapDispatchToProps = dispatch => bindActionCreators({
    sendMessage,
    loadMessages
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
