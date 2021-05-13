import React from 'react';
import PropTypes from 'prop-types';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    profile: PropTypes.objectOf(PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    })).isRequired,
  };

   componentDidMount() {
        this.props.loadProfile();
    }

  render() {

    let { firstName, lastName, age, photo } = this.props.profile;

    const { title } = this.props;

    return (
      <div className={s.header}>
        <div className={s.messagerContainer}>
          <div className={s.profileInfo}>
            <img className={s.profilePhoto} src={photo} alt="img" />
            <NavLink className={s.headerText} to='/profile'>{firstName} {lastName}</NavLink>
          </div>
          <p className={s.headerText}>{title}</p>
        </div>
      </div>
    )
  };
}