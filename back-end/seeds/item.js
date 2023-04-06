/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, UserID: 1, Item_Name: 'Nikes', Description: 'Classy athletic footwear', Quantity: 1},
    {id: 2, UserID: 2, Item_Name: 'Jordans', Description: 'Fire', Quantity: 3}
  ]);
};
