# Snapshot report for `tests/index.test.ts`

The actual snapshot is saved in `index.test.ts.snap`.

Generated by [AVA](https://avajs.dev).

## knex-little-logger

> Snapshot 1

    `Results:␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where \`id\` = 1␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where id = 1␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where \`id\` = 1␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where \`name\` = 'Who?' and \`id\` = 999␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`not_existing_table\` where \`name\` = 'Who?' and \`id\` = 999 and \`name\` = 'Kazuya'␊
    `

> Snapshot 2

    `Results:␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where \`id\` = ?␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where id = ?␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where \`id\` = ?␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where \`name\` = ? and \`id\` = 999␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`not_existing_table\` where \`name\` = ? and \`id\` = 999 and \`name\` = ?␊
    `

> Snapshot 3

    `Results:␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where \`id\` = 1␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where id = 1␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where \`id\` = 1␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`users\` where \`name\` = 'Who?' and \`id\` = 999␊
    SQL (0.0000 ms) select \`id\`, \`name\` from \`not_existing_table\` where \`name\` = 'Who?' and \`id\` = 999 and \`name\` = 'Kazuya'␊
    `

> Snapshot 4

    `Results:␊
    SQL (0.0000 ms) select id, name from users where id = 1␊
    SQL (0.0000 ms) select id, name from users where id = 1␊
    SQL (0.0000 ms) select id, name from users where id = 1␊
    SQL (0.0000 ms) select id, name from users where name = 'Who?' and id = 999 and is_active = false and is_active = true and is_active is null␊
    SQL (0.0000 ms) select id, name from not_existing_table where name = 'Who?' and id = 999 and name = 'Kazuya'␊
    `
