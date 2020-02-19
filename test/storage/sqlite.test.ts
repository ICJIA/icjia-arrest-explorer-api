import assert from 'assert'
import * as data from '../../src/data'
import * as sqlite from '../../src/storage/sqlite'

describe('fetchFromDB', () => {
  it('should return a proper Table from a SQLite database', async () => {
    const sqlite3 = require('sqlite3').verbose()
    const db = new sqlite3.Database('./database.db')

    const actual = await sqlite.fetchFromDB(db, 'SELECT * FROM Arrests')
    db.close()
    const expected: data.Table = [
      { arrestyear: 2009, value: 2435 },
      { arrestyear: 2010, value: 2256 },
      { arrestyear: 2011, value: 2130 },
      { arrestyear: 2012, value: 2065 },
      { arrestyear: 2013, value: 2071 },
      { arrestyear: 2014, value: 1965 },
      { arrestyear: 2015, value: 1978 },
      { arrestyear: 2016, value: 1942 },
      { arrestyear: 2017, value: 1820 },
      { arrestyear: 2018, value: 1795 },
    ]

    assert.deepEqual(actual, expected)
  })
})

describe('buildSqlForTable', () => {
  it('should return a SQL statement based on table name', () => {
    const actual = sqlite.buildSqlForTable('ArrestsByAgegroupAndGender')
    const expected =
      'SELECT * FROM ArrestsByAgegroupAndGender ORDER BY arrestyear, agegroup, gender'

    assert.deepEqual(actual, expected)
  })

  it('should return a SQL statement based on reference table name', () => {
    const actual = sqlite.buildSqlForTable('RefByAgegroup')
    const expected = 'SELECT * FROM RefByAgegroup ORDER BY id, value'

    assert.deepEqual(actual, expected)
  })
})
