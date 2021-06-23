export type LogFn = Console['log']
export type Binding = string | number | boolean | null
export type Bindings = Binding[]
export type KnexDriver = 'sqlite3' | 'pg' | 'mysql2' | 'mysql'

export interface Options {
  logger?: LogFn
  bindings?: boolean
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
