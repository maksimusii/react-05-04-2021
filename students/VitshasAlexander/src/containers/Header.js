import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";

import { loadProfile } from "../actions/profileActions";

import Header from "../components/Header";

const mapStateToProps = (store) => {
  return {
    users: store.profileReducer.users,
    isLoading: store.profileReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadProfile,
      push,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
