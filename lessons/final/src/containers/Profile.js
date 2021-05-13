import { connect } from 'react-redux';
import Profile from '../components/Profile';

const mapStateToProps = (store) => {
    return store.profileReducer;
};

export default connect(mapStateToProps)(Profile);
