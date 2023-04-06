const knex = require("./dbConnection");
const controllers = require("./controllers");

const getUser = (username) => {
  return knex
    .select("*")
    .from("users")
    .where("username", `${username}`)
    .then((data) => {
      if (data.length === 0) {
        return -1;
      }
      return data[0];
    });
};
const addUser = (req, hash) => {
  knex("users")
    .insert({
      firstName: req.get("firstName"),
      lastName: req.get("lastName"),
      username: req.get("username"),
      password: req.get("password")
    })
    .then((data) => {
      console.log(data);
    });
};
const deleteUser = async (req) => {
  let user = await getUser(req.get('username'));
  // await controllers.deleteUserFavorites(user.id);
  knex("users")
    .where("username", req.get('username'))
    .del()
    .then((data) => {
      console.log(data);
    });
};
const updatePassword = (username, password) => {
  knex("users")
    .where("username", username)
    .update({
      password: "password",
    })
    .then((data) => {
      console.log(data);
    });
};

module.exports = { getUser, addUser, deleteUser, updatePassword };