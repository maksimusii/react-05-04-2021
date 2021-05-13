import React from "react";
import PropTypes from "prop-types";

//import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./style.css";

export default class Header extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string.isRequired,
    users: PropTypes.objectOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        bio: PropTypes.string,
        photo: PropTypes.string,
      })
    ).isRequired,
    loadProfile: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.loadProfile();
  }
  handleLinkClick = (link) => {
    this.props.push(link);
  };

  render() {
    const { users, title, isLoading } = this.props;
    const userId = Number(Object.keys(users).pop());
    if (isLoading) {
      return <CircularProgress />;
    }

    return (
      <AppBar position="static">
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Avatar
            onClick={() => {
              this.handleLinkClick(`/profile`);
            }}
            className="header-profile-avatar"
          >
            {users[userId]?.firstName?.charAt(0)}
            {users[userId]?.lastName?.charAt(0)}
          </Avatar>
        </Toolbar>
      </AppBar>
    );
  }
}
