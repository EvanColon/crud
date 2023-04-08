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
//   getAllCities: () => {
//     return knex.select("*").from("cities");
//   },

//   getAllHousing: () => {
//     return knex.select("*").from("housing");
//   },

//   getAllMovingCompanies: () => {
//     return knex.select("*").from("moving_companies");
//   },

//   getAllUsers: () => {
//     return knex.select("*").from("users");
//   },

//   getAllSchools: () => {
//     return knex.select("*").from("schools");
//   },

//   getAllFavoriteHousing: () => {
//     return knex.select("*").from("favorite_housing");
//   },

//   createItem: async (newItem, table) => {
//     return knex(table).insert(newItem).returning("id");
//   },

//   addNewFavorites: (data) => {
//     return knex("favorite_housing").insert(data, ["id"]);
//   },
//   deleteUserFavorites: (id) => {
//     return knex("favorite_housing").where("user_id", id).del();
//   },

//   addHousing: (houseToInsert) => {
//     return knex("housing")
//       .insert(houseToInsert)
//       .then((data) => {
//         console.log(data);
//       });
//   },

//   deleteHousing: async (id, res) => {
//     let results = await knex("housing")
//     .where("id", id)
//     .del()
    
//     if(results === 0){
//       res.status(200).send({error: true, message: "ID not found."})
//     }else{
//       res.status(200).send({error: false, message: "Successfully deleted."})
//     }
      
//   },

//   addMovingCompany: (req, res) => {
//     const data = req.body;
//     knexConnectors.addMovingCompany(data)
//       .then(() => {
//         res.status(201).send('You successfully added the moving companies!');
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(200).send('Error adding moving companies to database.');
//       });
//   },

//   updateMovingCompanies: async (req, res) => {
//       const data = req.body;
//       const companyToUpdate = req.get("name")

//       await updateMovers(data, companyToUpdate)
//         .then(() => {
//           res.status(201).send({error: false, message: 'You successfully updated the moving companies!'});
//         })
//         .catch((error) => {
//           console.error(error);
//           res.status(200).send({error: true, message: 'Error updating moving companies in database.'});
//         });
//     },
