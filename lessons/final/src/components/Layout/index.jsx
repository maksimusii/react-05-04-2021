import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Header from '../../containers/Header';
import ChatList from '../../containers/ChatList';
import './styles.css';

export default class Layout extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        chatId: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    render() {
        const { chatId, children, title } = this.props;

        return (
            <Container className="layout">
                <Header title={title} />
                <div className="layout-content">
                    <div className="layout-content-left">
                        <ChatList chatId={chatId} />
                    </div>
                    <div className="layout-content-right">
                        { children }
                    </div>
                </div>
            </Container>
        );
    }
}
