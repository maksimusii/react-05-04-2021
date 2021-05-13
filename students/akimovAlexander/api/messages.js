const path = require('path');
const { getJson, setJson } = require('./utils');
const messagesFile = path.resolve(__dirname, 'data', 'messages.json');

module.exports = (app) => {
    const getMessages = () => {
        return getJson(messagesFile);
    };

    const setMessages = (chats) => {
        return setJson(messagesFile, chats);
    };

    app.get('/messages', async (req, res) => {
        const messages = await getMessages();
        const queryChatId = Number(req.query.chatId);

        if (!queryChatId) {
            return res.json(messages);
        }

        res.json(messages.filter(({ chatId }) => chatId === queryChatId));
    });

    app.post('/messages', async (req, res) => {
        const messages = await getMessages();
        const newMessage = req.body;

        if (messages.some(({ id }) => id === newMessage.id)) {
            res.status(400).send(`Сообщение с идентификатором ${newMessage.id} уже существует`);
        }

        messages.push(newMessage);
        await setMessages(messages);

        res.status(204).end();
    });

    app.delete('/messages/:id', async (req, res) => {
        const messages = await getMessages();
        const messageId = Number(req.params.id);

        setMessages(messages.filter(({ id }) => id !== messageId));

        res.status(204).end();
    });

    app.delete('/messages', async (req, res) => {
        const messages = await getMessages();
        const queryChatId = Number(req.query.chatId);

        if (queryChatId) {
            setMessages(messages.filter(({ chatId }) => chatId !== queryChatId));
        }

        res.status(204).end();
    });
};