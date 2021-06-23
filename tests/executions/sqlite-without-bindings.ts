import createKnex from 'knex'
import { knexLittleLogger } from '../../src'
import { run } from '../helpers'

run(async () => {
  const knex = createKnex({
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
  })

  knexLittleLogger(knex, {
    bindings: false,
  })

  console.log('Results:')

  await knex.schema.createTable('users', (t) => {
    t.increments('id')
    t.string('name')
  })

  await knex.schema.createTable('posts', (t) => {
    t.increments('id')
    t.string('name')
  })

  await knex('users').select('id', 'name').where({ id: 1 })
  await knex('users').select('id', 'name').whereRaw('id = ?', [1])
  await knex('users')
    .select('id', 'name')
    .whereRaw(':column: = :id', { column: 'id', id: 1 })
  await knex('users')
    .select('id', 'name')
    .whereRaw(':column: = :name', { column: 'name', name: 'Who?' })
    .where({ id: knex.raw('999') })

  await knex('not_existing_table')
    .select('id', 'name')
    .whereRaw(':column: = :name', { column: 'name', name: 'Who?' })
    .where({ id: knex.raw('999') })
    .where({ name: knex.raw('?', 'Kazuya') })
    .catch(() => {})

  await knex.destroy()
})
