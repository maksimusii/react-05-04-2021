import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./style.css";

export default class Profile extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    users: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        bio: PropTypes.string,
        photo: PropTypes.string,
      })
    ).isRequired,
    loadProfile: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadProfile();
  }
  render() {
    const { users, isLoading } = this.props;
    const userId = Number(Object.keys(users).pop());

    if (isLoading) {
      return <CircularProgress />;
    }
    return (
      <Card>
        <img
          src={"img/" + users[userId]?.photo}
          alt="Photo by Filipp Romanovski on Unsplash"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {users[userId]?.firstName} {users[userId]?.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {users[userId]?.bio}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
