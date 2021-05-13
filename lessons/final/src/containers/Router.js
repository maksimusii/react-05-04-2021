import { connect } from 'react-redux';
import Router from '../components/Router';

const mapStateToProps = (store) => {
    return {
        chats: store.chatReducer.chats,
        isLoaded: store.chatReducer.isLoaded
    };
};

export default connect(mapStateToProps)(Router);
