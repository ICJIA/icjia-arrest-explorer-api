import assert from 'assert'
import * as data from '../../src/data'
import * as cache from '../../src/storage/cache'

describe('fetchFromDB', () => {
  it('should return a proper Table from a SQLite database', async () => {
    const sqlite3 = require('sqlite3').verbose()
    const db = new sqlite3.Database('./database.db')

    const actual = await cache.fetchFromDB(db, 'SELECT * FROM Arrests')
    db.close()
    const expected: data.Table = [
      { year: 2009, value: 2435 },
      { year: 2010, value: 2256 },
      { year: 2011, value: 2130 },
      { year: 2012, value: 2065 },
      { year: 2013, value: 2071 },
      { year: 2014, value: 1965 },
      { year: 2015, value: 1978 },
      { year: 2016, value: 1942 },
      { year: 2017, value: 1820 },
      { year: 2018, value: 1795 },
    ]

    assert.deepEqual(actual, expected)
  })
})

describe('buildSqlForTable', () => {
  it('should return a SQL statement based on table name', () => {
    const actual = cache.buildSqlForTable('ArrestsByAgegroupAndGender')
    const expected =
      'SELECT * FROM ArrestsByAgegroupAndGender ORDER BY year, agegroup, gender'

    assert.deepEqual(actual, expected)
  })
})
