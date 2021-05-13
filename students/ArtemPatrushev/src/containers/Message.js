import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteMessage} from '../Actions/messageAction.js';
import Message from '../components/Message/Message.jsx';

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteMessage
}, dispatch);

export default connect(null, mapDispatchToProps)(Message);
