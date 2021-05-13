import { connect } from "react-redux";
import Profile from "../components/Profile/Profile";
import { bindActionCreators } from "redux";
import { loadProfile } from "../actions/profileActions";

const mapStateToProps = ({ profileReducer }) => ({
  firstName: profileReducer.firstName,
  secondName: profileReducer.secondName,
  email: profileReducer.email,
  description: profileReducer.description,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loadProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
