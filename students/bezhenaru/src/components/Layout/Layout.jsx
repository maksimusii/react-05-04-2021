import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import './layout.css';
import Header from '../../containers/Header';
import ChatList from '../../containers/ChatList';

export default class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.string,
        title: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
    };

    render() {
        const { chatId, children, title } = this.props;

        return (
            <Container className='layout'>
                <Header title={title} />
                <div className='layout-content'>
                    <div className='layout-content-left'>
                        <ChatList chatId={chatId} />
                    </div>
                    <div className='layout-content-right'>
                        {children}
                    </div>
                </div>
            </Container>
        );
    }
}
