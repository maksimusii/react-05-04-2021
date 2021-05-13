import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { sendMessage, loadMessages } from "../actions/messageActions";
import MessageFields from "../components/MessageFields";

const mapStateToProps = (store) => {
  return store.messageReducer;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sendMessage,
      loadMessages,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MessageFields);
