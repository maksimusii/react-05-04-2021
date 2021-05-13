import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteMessage } from "../actions/messageActions";
import Message from "../components/Message";

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteMessage,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Message);
