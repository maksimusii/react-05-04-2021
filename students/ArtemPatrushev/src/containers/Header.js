
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadProfile } from '../Actions/profileAction.js';
import Header from '../components/Header/Header.jsx';

const mapStateToProps = (store) => {
    // debugger;
    return {
        profile: store.profileReducer.profile,
        isLoading: store.profileReducer.isLoading,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadProfile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);