#!/usr/bin/env node

const sinon = require('sinon')

sinon.stub(process.hrtime, 'bigint').get(() => () => 0)

require('ts-node/register/transpile-only')
require(process.argv[2])
