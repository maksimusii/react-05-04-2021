import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';

export default class ChatList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        isAdding: PropTypes.bool,
        chatId: PropTypes.string,
        chats: PropTypes.objectOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            unread: PropTypes.bool,
            isDeleting: PropTypes.bool,
        })).isRequired,
        addChat: PropTypes.func.isRequired,
        deleteChat: PropTypes.func.isRequired,
        markChatRead: PropTypes.func.isRequired,
        loadChats: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    };

    state = {
        chatName: ''
    };

    componentDidMount() {
        this.props.loadChats();
    }

    componentDidUpdate(prevProps) {
        const { chatId, markChatRead } = this.props;

        if (chatId && prevProps.chatId !== chatId) {
            markChatRead(chatId);
        }
    }

    handleChatNameChange = (event) => {
        this.setState({
            chatName: event.target.value
        });
    };

    handleAddChatClick = () => {
        const { chats, addChat } = this.props;

        const id = Number(Object.keys(chats).pop()) + 1;

        addChat({
            id: id || 1,
            title: this.state.chatName
        });

        this.setState({
            chatName: ''
        });
    };

    handleLinkClick = (link) => {
        this.props.push(link);
    };

    handleDeleteClick = (event) => {
        event.stopPropagation();
        const { deleteChat } = this.props;
        const id = event.currentTarget.dataset.id;

        deleteChat(id);
    };

    render() {
        const { chatName } = this.state;
        const { chats, isLoading, isAdding } = this.props;

        if (isLoading) {
            return <CircularProgress />;
        }

        return (
            <div className="chat-list">
                <List>
                    {Object.entries(chats).map(([id, value]) => (
                        <ListItem
                            key={id}
                            button
                            selected={id === this.props.chatId}
                            className='chat-list-item'
                            onClick={() => { this.handleLinkClick(`/chat/${id}`) }}>
                            <Avatar className='chat-list-avatar'>
                                {value.title.split(' ').map(w => w.charAt(0))}
                            </Avatar>
                            <ListItemText primary={value.title}/>
                            { value.unread ? <div className='chat-list-unread' /> :
                                value.isDeleting ? <CircularProgress size={20} /> : (
                                    <IconButton
                                        size='small'
                                        data-id={id}
                                        className='chat-list-delete'
                                        onClick={this.handleDeleteClick}>
                                        <DeleteIcon/>
                                    </IconButton>
                                )
                            }
                        </ListItem>
                    ))}
                    { isAdding && <CircularProgress /> }
                    <ListItem>
                        <TextField
                            value={chatName}
                            onChange={this.handleChatNameChange} />
                        <IconButton
                            disabled={!chatName}
                            onClick={this.handleAddChatClick}>
                            <AddIcon />
                        </IconButton>
                    </ListItem>
                </List>
            </div>
        );
    }
}
