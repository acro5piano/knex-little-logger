import createKnex from 'knex'
import { knexLittleLogger } from '../../src'
import { run } from '../helpers'

run(async () => {
  const knex = createKnex({
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 20919,
      user: 'root',
      password: 'password',
      database: 'mydb',
    },
  })

  await knex.raw('drop table if exists users')
  await knex.raw('drop table if exists posts')

  knexLittleLogger(knex, {
    bindings: true,
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
