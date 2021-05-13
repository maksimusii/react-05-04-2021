import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = (store) => {
    return {
        profile: store.profileReducer
    };
};

export default connect(mapStateToProps)(Header);
