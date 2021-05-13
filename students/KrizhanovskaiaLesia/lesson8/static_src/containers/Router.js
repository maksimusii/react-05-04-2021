import { connect } from 'react-redux';
import Router from '../components/Router.jsx';

const mapStateToProps = (store) => {
    return {
        chats: store.chatReducer.chats
    };
};

export default connect(mapStateToProps)(Router);