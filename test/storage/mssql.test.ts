import assert from 'assert'
import dotenv from 'dotenv'
import mssql from 'mssql'
import * as data from '../../src/data'
import * as _mssql from '../../src/storage/mssql'

dotenv.config()

describe('fetchFromDB', () => {
  it('should return a proper Table from a MS SQL database', async () => {
    const config = {
      user: String(process.env.MSSQL_USER),
      password: String(process.env.MSSQL_PASSWORD),
      server: String(process.env.MSSQL_SERVER),
      database: String(process.env.MSSQL_DATABASE),
    }

    const pool = await new mssql.ConnectionPool(config).connect()

    const actual = await _mssql.fetchFromDB(pool, 'SELECT * FROM RefFelony')
    pool.close()

    const expected: data.Table = [
      { id: 0, value: 'misdemeanor' },
      { id: 1, value: 'felony' },
    ]

    assert.deepEqual(actual, expected)
  })
})

describe('buildSqlForTable', () => {
  it('should return a SQL statement based on table name', () => {
    const actual = _mssql.buildSqlForTable('ArrestsByAgegroupAndGender')
    const expected =
      'SELECT * FROM ArrestsByAgegroupAndGender ORDER BY arrestyear, agegroup, gender'

    assert.deepEqual(actual, expected)
  })

  it('should return a SQL statement based on reference table name', () => {
    const actual = _mssql.buildSqlForTable('RefByAgegroup')
    const expected = 'SELECT * FROM RefByAgegroup ORDER BY id, value'

    assert.deepEqual(actual, expected)
  })
})
