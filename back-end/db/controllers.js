const knex = require("./dbConnection");

module.exports = {
  getAllItems: () => {
    return knex.select("*").from("item");
  },

  addNewItem: async (req) => {
    knex("item")
      .insert({
        userId: req.get("userId"),
        itemName: req.get("itemName"),
        description: req.get("description"),
        quantity: req.get("quantity")
      })
      .then((data) => {
        console.log(data);
      });
  },
  deleteItem: async (req) => {
    // let user = await getUser(req.get('username'));
    knex("item")
      .where("id", req.get('id'))
      .del()
      .then((data) => {
        console.log(data);
      });
  },

  updateItem: async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const id = req.get("itemId");
    
    await knex("item")
      .whereILike("id", `%${id}%`)
      .update(data)
      .limit(1)
      .then(() => {
        res.status(201).send({error: false, message: 'You successfully updated the item!'});
      })
      .catch((error) => {
        console.error(error);
        res.status(200).send({error: true, message: 'Error updating item in database.'});
      });
  },

  updateName: async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const name = req.get("itemName");
    
    await knex("item")
      .whereILike("itemName", `%${name}%`)
      .update("itemName")
      .limit(1)
      .then(() => {
        res.status(201).send({error: false, message: 'You successfully updated the item!'});
      })
      .catch((error) => {
        console.error(error);
        res.status(200).send({error: true, message: 'Error updating item in database.'});
      });
  },

  updateDescription: async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const id = req.get("itemId");

    await knex("item")
      .whereILike("id", `%${id}%`)
      .update(data)
      .limit(1)
      .then(() => {
        res.status(201).send({error: false, message: 'You successfully updated the housing!'});
      })
      .catch((error) => {
        console.error(error);
        res.status(200).send({error: true, message: 'Error updating housing in database.'});
      });
  }
}
