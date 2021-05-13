import { connect } from 'react-redux';
import Profile from '../components/Profile/Profile';

const mapStateToProps = (store) => {
    return store.profileReducer;
};

export default connect(mapStateToProps)(Profile);
