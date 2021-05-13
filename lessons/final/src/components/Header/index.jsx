import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import './style.css';

export default class Header extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired
        }).isRequired
    };

    render() {
        const { profile, title } = this.props;

        return (
            <div className='header'>
                <div className='header-profile'>
                    <Link to='/profile'>
                        <div className='header-profile-container'>
                            <Avatar className='header-profile-avatar'>
                                { profile.firstName.charAt(0) }
                                { profile.lastName.charAt(0) }
                            </Avatar>
                            <div>
                                { profile.firstName }
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='header-title'>{ title }</div>
            </div>
        );
    }
}
