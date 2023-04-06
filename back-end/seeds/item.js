/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, userId: 1, itemName: 'Nikes', description: 'Classy athletic footwear', quantity: 1},
    {id: 2, userId: 2, itemName: 'Jordans', description: 'Fire', quantity: 3}
  ]);
};
