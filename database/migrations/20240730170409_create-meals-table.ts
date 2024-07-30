import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.boolean('diet').defaultTo(false)
    table.bigInteger('user_id').unsigned().notNullable()
    table.dateTime('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals')
}
