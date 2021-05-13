const path = require("path");
const { getJson } = require("./utils");
const usersFile = path.resolve(__dirname, "data", "users.json");

module.exports = (app) => {
  const getUsers = () => {
    return getJson(usersFile);
  };

  app.get("/users", async (req, res) => {
    res.json(await getUsers());
  });
};
