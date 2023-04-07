/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {firstName: 'Joe', lastName: 'Zoomer', username: 'user', password: 'use'},
    {firstName: 'Bob', lastName: 'Boomer', username: 'admin', password: 'add'},
  ]);
};
