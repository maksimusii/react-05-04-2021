import React from 'react';
import s from './ChatList.module.css';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export default class ChatList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        chatId: PropTypes.string,
        chats: PropTypes.objectOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            unread: PropTypes.bool,
        })).isRequired,
        addChat: PropTypes.func.isRequired,
        markChatRead: PropTypes.func.isRequired,
        loadChats: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    };

    state = {
        newChatName: ''
    };

    componentDidMount() {
        this.props.loadChats();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chatId !== this.props.chatId) {
            this.props.markChatRead(this.props.chatId);
        }
    }

    handleEnterChatName = (event) => {
        console.log(event.target.value);
        this.setState({
            newChatName: event.target.value
        });
    };
    
    handleClickAddNewChat = () => {
        this.props.addChat(this.state.newChatName);
        
        this.setState({
            newChatName: ''
        });
        console.log(this.state.newChatName);
    };

    deleteChatClick = () => {
        this.props.deleteChat(this.props.chatId);
    }

    handleNavigate = (link) => {
       this.props.push(link);
    };

    render() {

        const { chatName } = this.state;
        const { chats, isLoading } = this.props;

        if (isLoading) {
            return <CircularProgress />;
        }

        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" className={s.yourChatsHeader}>
                        Your Chats
                    </ListSubheader>
                }
                className={s.root}
                > 
                {Object.entries(chats).map(([ id, value ]) => (
                    // key всегда на верхнем элементе рендера
                    // to={`/chat/${id}`} --- позволяет перейти по указанной ссылке
                    // selected={id === this.props.chatId} --- фиксируется выбранный чат - выделение цветом
                    
                   
                        // <ListItem button selected={id === this.props.chatId} onClick={() => this.handleNavigate(`/chat/${id}`)} key={id}>
                        //     <ListItemText primary={value.title} />
                        // </ListItem>
                        <div className={s.chatItem}>
                            <ListItem
                                key={id}
                                button
                                selected={id === this.props.chatId}
                                onClick={() => { this.handleNavigate(`/chat/${id}`) }}>
                                <ListItemText primary={value.title} />
                                {value.unread && <div className={s.unreadChat}></div>}
                            </ListItem>
                            <IconButton className={s.iconButton} aria-label="delete"
                                onClick={this.deleteChatClick}>
                                <DeleteIcon style={{width: '17px'}} />
                            </IconButton>
                        </div>
                    // {value.unread && <div className={s.unreadChat}></div>}  --- если value unread, то дорисовывается div
                ))}
                <ListItem button>
                    <TextField
                        className={s.newChatNameInput}
                        value={chatName}
                        placeholder='Enter the name of the chat'
                        onChange={this.handleEnterChatName} />
                    <SendIcon 
                        disabled={!chatName}
                        onClick={this.handleClickAddNewChat}/>
                </ListItem>
            </List>
        );
    };
};

//Object.entries(chats) - разложит объект на массив элементов. В данном случае первый элемент в массиве - ключ(цифра), второй - title (получится массив массивов)
