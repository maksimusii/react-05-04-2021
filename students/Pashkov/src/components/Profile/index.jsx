import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Profile extends React.Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        mail: PropTypes.string.isRequired,
    };

    render() {
        const { firstName, lastName, phone, mail } = this.props;

        return (
            <div className="profile">
                <p>Имя: {firstName}</p>
                <p>Фамилия: {lastName}</p>
                <p>Тел.: {phone}</p>
                <p>Email.: <a href="#">{mail}</a></p>

            </div>
        );
    }
}
