import test from 'ava'
import pify from 'pify'
import { execFile } from 'child_process'

test('sqlite', async (t) => {
  const stdout = await pify(execFile)('tests/cli-runner.js', [
    './executions/sqlite.ts',
  ])
  t.snapshot(stdout)
})
