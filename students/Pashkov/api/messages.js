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

        newMessage.id = (messages[messages.length - 1]?.id ?? 0) + 1;
        newMessage.chatId = Number(newMessage.chatId);

        messages.push(newMessage);
        await setMessages(messages);

        res.json({
            messageId: newMessage.id
        });
    });

    app.delete('/messages/:id', async (req, res) => {
        const messages = await getMessages();
        const messageId = Number(req.params.id);

        await setMessages(messages.filter(({ id }) => id !== messageId));

        res.status(204).end();
    });

    app.delete('/messages', async (req, res) => {
        const messages = await getMessages();
        const queryChatId = Number(req.query.chatId);

        if (queryChatId) {
            await setMessages(messages.filter(({ chatId }) => chatId !== queryChatId));
        }

        res.status(204).end();
    });
};
