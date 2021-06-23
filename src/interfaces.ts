export type LogFn = Console['log']
export type Binding = string | number | boolean | null
export type Bindings = Binding[]
export type KnexDriver = 'sqlite3' | 'pg' | 'mysql2' | 'mysql'

export interface Options {
  /**
   * A log function to be used for output.
   * If you are using `pino`, it should be like this:
   *
   * ```ts
   * import pino from 'pino'
   *
   * const looger = pino()
   * knexLittleLogger(knex, { logger: pino.info.bind(pino) }
   * ```
   *
   * Default: `console.log
   */
  logger?: LogFn

  /**
   * If `true` attach binding values to the console output.
   *
   * Default: `true`.
   */
  bindings?: boolean

  /**
   * If `true` allows the colorized output.
   *
   * Default: `true`.
   */
  colorized?: boolean
}

export interface PrinterOptions {
  logger: LogFn
  withBindings: boolean
  driver: KnexDriver
  colorized: boolean
}

export interface OnQueryArgs {
  __knexQueryUid?: string
  sql: string
  bindings: Array<string | number | boolean>
}

export interface Query {
  sql: string
  bindings: Array<string | number | boolean>
  startTime: BigInt
}
