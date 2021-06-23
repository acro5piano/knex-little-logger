import test from 'ava'
import pify from 'pify'
import { execFile } from 'child_process'

test('knex-little-logger', async (t) => {
  let stdout = await pify(execFile)('tests/cli-runner.js', [
    './executions/sqlite-with-bindings.ts',
  ])
  t.snapshot(stdout)

  stdout = await pify(execFile)('tests/cli-runner.js', [
    './executions/sqlite-without-bindings.ts',
  ])
  t.snapshot(stdout)

  stdout = await pify(execFile)('tests/cli-runner.js', [
    './executions/mysql2-with-bindings.ts',
  ])
  t.snapshot(stdout)

  stdout = await pify(execFile)('tests/cli-runner.js', [
    './executions/pg-with-bindings.ts',
  ])
  t.snapshot(stdout)
})
