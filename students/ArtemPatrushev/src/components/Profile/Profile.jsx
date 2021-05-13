import React from 'react';
import PropTypes from 'prop-types';
import s from './Profile.module.css';
import Header from '../../containers/Header.js';
import SideBar from '../SideBar/SideBar.jsx';

export default class Profile extends React.Component {
    static propTypes = {
        // firstName: PropTypes.string.isRequired,
        // lastName: PropTypes.string.isRequired,
        // age: PropTypes.string.isRequired,
        // photo: PropTypes.string.isRequired,
        profile: PropTypes.objectOf(PropTypes.string).isRequired,
        loadProfile: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.loadProfile();
    }

    render() {
        // debugger

        let { firstName, lastName, age, photo} = this.props.profile;

        return (
            // <div className={s.profileBack}>
            //     <Header />
                // <div className={s.profileWrapper}>
                //     <SideBar />
                    <div className={s.profileUser}>
                        <img src={photo} />
                        <div className={s.userInfo}>
                            <p>Name: {firstName}</p>
                            <p>Surname: {lastName}</p>
                            <p>Age: {age}</p>
                        </div>
                    </div>
                // </div>
            // </div>
        )
    }
}