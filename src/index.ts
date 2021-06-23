import { Knex } from 'knex'
import {
  KnexDriver,
  LogFn,
  PrinterOptions,
  Binding,
  Bindings,
  OnQueryArgs,
  Options,
  Query,
} from './interfaces'
import chalk from 'chalk'

const COLORIZE = {
  primary: chalk.magenta,
  error: chalk.red,
  success: chalk.cyan,
}

const BINDING_REGEX = {
  pg: /\$\d{1,2}/g,
  sqlite3: /\?/g,
} as const

const queries = new Map<string, Query>()

export function knexLittleLogger(knex: Knex, options: Options = {}) {
  const { logger = console.log, bindings = false } = options

  const printer = makePrinter({
    logger,
    withBindings: bindings,
    driver: knex.client.config.client,
  })

  knex
    .on('query', onQuery)
    .on('query-response', printer)
    .on('query-error', printer)
}

function onQuery({ __knexQueryUid: queryId, sql, bindings }: OnQueryArgs) {
  if (queryId) {
    queries.set(queryId, {
      sql,
      bindings,
      startTime: process.hrtime.bigint(),
    })
  }
}

function makePrinter(options: PrinterOptions) {
  if (!options.withBindings) {
    return function printer(
      err: Error,
      { __knexQueryUid: queryId }: OnQueryArgs,
    ) {
      const queryInfo = getQueryInfoAfterResponse(queryId)
      if (!queryInfo) {
        return
      }
      printColorizedResult(
        options.logger,
        queryInfo.duration,
        queryInfo.sql,
        err,
      )
    }
  }

  if (options.driver !== 'pg' && options.driver !== 'sqlite3') {
    throw new Error(
      `[knex-little-logger] Currently ${options.driver} with bindings is not supported.`,
    )
  }

  return function printer(
    err: Error,
    { __knexQueryUid: queryId, bindings }: OnQueryArgs,
  ) {
    const queryInfo = getQueryInfoAfterResponse(queryId)
    if (!queryInfo) {
      return
    }
    printColorizedResult(
      options.logger,
      queryInfo.duration,
      printWithBindings(queryInfo.sql, bindings, options.driver),
      err,
    )
  }
}

function getQueryInfoAfterResponse(queryId?: string) {
  const query = queryId && queries.get(queryId)
  if (!query) {
    return
  }
  const duration = measureDuration(query.startTime)
  return { sql: query.sql, duration }
}

function measureDuration(start: BigInt) {
  return (
    (Number(process.hrtime.bigint()) - Number(start)) /
    1_000_000
  ).toFixed(4)
}

function printColorizedResult(
  logger: LogFn,
  duration: string,
  parsedQuery: string,
  err?: any,
) {
  if (err instanceof Error) {
    logger(
      '%s %s',
      COLORIZE.primary`SQL (${duration} ms)`,
      COLORIZE.error(parsedQuery),
    )
  } else {
    logger(
      '%s %s',
      COLORIZE.primary`SQL (${duration} ms)`,
      COLORIZE.success(parsedQuery),
    )
  }
}

function printWithBindings(
  sql: string,
  bindings: Bindings,
  driver: KnexDriver,
) {
  let index = 0
  return sql
    .replace(BINDING_REGEX[driver], () => {
      const variable = bindings[index++]
      return formatBindingValue(variable)
    })
    .replace(/ {2,}/g, ' ')
    .replace(/[\"|\n]/g, '')
}

function formatBindingValue(value: Binding) {
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}
