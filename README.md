# knex-little-logger

[![test](https://github.com/acro5piano/knex-little-logger/actions/workflows/test.yml/badge.svg)](https://github.com/acro5piano/knex-little-logger/actions/workflows/test.yml)
![npm (tag)](https://img.shields.io/npm/v/knex-little-logger/latest)

> Zero config queries logger for knex

![](https://user-images.githubusercontent.com/10719495/123086215-1b99a300-d45e-11eb-9470-3a4c58588429.png)

## Usage

Install the package:

```bash
$ yarn add knex-little-logger
```

Apply `knex-little-logger` to `knex` instance:

```js
import createKnex from 'knex'
import { knexLittleLogger } from 'knex-little-logger'

const knexOptions = {} // Your knex config
const knex = createKnex(knexOptions)
knexLittleLogger(knex)

// alternative
// knex-little-logger returns knex instance
// so you can do like this
const knex = knexLittleLogger(createKnex(knexOptions))
```

## Advanced usage

By default `knex-little-logger` uses `console.log`, but you can specify any logger which your prefer:

```js
import createKnex from 'knex'
import { knexLittleLogger } from 'knex-little-logger'
import initDebug from 'debug'

const awesomeLogger = initDebug('my-project:knex')
const knexOptions = {} // Your knex config
const knex = createKnex(knexOptions)
knexLittleLogger(knex, { logger: awesomeLogger })
```

Also you can disable bindings:

```js
knexLittleLogger(knex, { bindings: false })
```

## License

[MIT](LICENSE.md)
