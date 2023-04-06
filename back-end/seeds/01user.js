/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, firstName: 'Joe', lastName: 'Zoomer', username: 'user', password: 'use'},
    {id: 2, firstName: 'Bob', lastName: 'Boomer', username: 'admin', password: 'add'},
  ]);
};
