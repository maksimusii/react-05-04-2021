const path = require('path');
const { getJson, setJson } = require('./utils');
const chatsFile = path.resolve(__dirname, 'data', 'chats.json');

module.exports = (app) => {
    const getChats = () => {
        return getJson(chatsFile);
    };

    const setChats = (chats) => {
        return setJson(chatsFile, chats);
    };

    app.get('/chats', async (req, res) => {
        res.json(await getChats());
    });

    app.post('/chats', async (req, res) => {
        const chats = await getChats();
        const newChat = req.body;

        if (chats.some(({ id }) => id === newChat.id)) {
            res.status(400).send(`Чат с идентификатором ${newChat.id} уже существует`);
        }

        chats.push(newChat);
        await setChats(chats);

        res.status(204).end();
    });

    app.delete('/chats/:id', async (req, res) => {
        const chats = await getChats();
        const chatId = Number(req.params.id);

        setChats(chats.filter(({ id }) => id !== chatId));

        res.status(204).end();
    });
};
