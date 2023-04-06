/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, First_Name: 'Joe', Last_Name: 'Zoomer', Username: 'user', Password: 'use'},
    {id: 2, First_Name: 'Bob', Last_Name: 'Boomer', Username: 'admin', Password: 'add'},
  ]);
};
