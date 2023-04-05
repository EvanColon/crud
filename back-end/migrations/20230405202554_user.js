/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary();
    table.string('First_Name').notNullable();
    table.string('Last_Name');
    table.string('Username');
    table.string('Password');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE IF EXISTS user CASCADE;');
};