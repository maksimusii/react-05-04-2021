import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';

export default class Profile extends React.Component {
    static propTypes = {
        profile: PropTypes.object.isRequired,
        loadProfile: PropTypes.func.isRequired,
        isLoading: PropTypes.bool
    };

    componentDidMount() {
        this.props.loadProfile();
      }
    render() {
        const { isLoading, profile } = this.props;
        let firstName ='';
        let lastName ='';
        Object.entries(profile).map(([id, value])=> {
            firstName = value.firstName;
            lastName = value.lastName;
        });
        if (isLoading) {
            return <CircularProgress />
          }
        return (
            
            <div className="profile">
                <p>First Name: { firstName }</p>
                <p>Last Name: { lastName }</p>
            </div>
        );
    }
}
