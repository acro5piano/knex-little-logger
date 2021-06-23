import { Knex } from 'knex'

type LogFn = Console['log']
type Bindings = Array<string | number | boolean>
type KnexDriver = 'sqlite3' | 'pg'

interface Options {
  logger?: LogFn
  bindings?: boolean
}

interface OnQueryArgs {
  sql: string
  bindings: Array<string | number | boolean>
}

export function knexLittleLogger(knex: Knex, options: Options = {}) {
  const { logger = console.log, bindings = false } = options

  const printer = makePrinter({
    logger,
    bindings,
    driver: knex.client.config.client,
  })

  knex.on('query', printer)

  knex.on('query-error', (err, ...args) => {
    console.log(args)
    // logger(
    //   'SQL () : %s',
    //   sql,
    // )
  })
}

function makePrinter(options: Required<Options> & { driver: KnexDriver }) {
  switch (options.driver) {
    case 'sqlite3':
      if (options.bindings) {
        return function printer({ sql, bindings }: OnQueryArgs) {
          options.logger('SQL () : %s', printWithBindingsSqlite(sql, bindings))
        }
      } else {
        return function printer({ sql, bindings }: OnQueryArgs) {
          options.logger('SQL () : %s', printWithBindingsSqlite(sql, bindings))
        }
      }
    default:
      throw new Error(
        `[knex-little-logger] Currently ${options.driver} is not supported.`,
      )
  }
}

function printWithBindingsPg(sql: string, bindings: Bindings) {
  let index = 0
  return sql
    .replace(/\$\d{1,2}/g, () => {
      const variable = bindings[index++]
      if (typeof variable === 'number') {
        return String(variable)
      }
      return `'${variable}'`
    })
    .replace(/ {2,}/g, ' ')
    .replace(/[\"|\n]/g, '')
}

function printWithBindingsSqlite(sql: string, bindings: Bindings) {
  let index = 0
  return sql
    .replace(/\?/g, () => {
      const variable = bindings[index++]
      if (typeof variable === 'number') {
        return String(variable)
      }
      return `'${variable}'`
    })
    .replace(/ {2,}/g, ' ')
    .replace(/[\"|\n]/g, '')
}
