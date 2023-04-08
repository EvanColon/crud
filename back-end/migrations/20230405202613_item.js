/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments('id').primary();
    table.integer('userId');
    table.string('itemName');
    table.string('description');
    table.integer('quantity');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE IF EXISTS item CASCADE;');
};