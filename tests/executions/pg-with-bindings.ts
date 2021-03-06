import createKnex from 'knex'
import { knexLittleLogger } from '../../src'
import { run } from '../helpers'

run(async () => {
  const knex = createKnex({
    client: 'pg',
    connection: 'postgres://postgres:postgres@127.0.0.1:12784/postgres',
    useNullAsDefault: true,
  })

  await knex.raw('drop schema public cascade; create schema public')

  knexLittleLogger(knex, {
    bindings: true,
  })

  console.log('Results:')

  await knex.schema.createTable('users', (t) => {
    t.increments('id')
    t.string('name')
    t.boolean('is_active')
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
    .where({ is_active: false })
    .where({ is_active: true })
    .where({ is_active: null })

  await knex('not_existing_table')
    .select('id', 'name')
    .whereRaw(':column: = :name', { column: 'name', name: 'Who?' })
    .where({ id: knex.raw('999') })
    .where({ name: knex.raw('?', 'Kazuya') })
    .catch(() => {})

  await knex.destroy()
})
