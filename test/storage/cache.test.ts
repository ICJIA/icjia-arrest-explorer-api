import assert from 'assert'
import * as data from '../../src/data'
import * as cache from '../../src/storage/cache'

describe('fetchFromDB', () => {
  it('should return a proper Table from a SQLite database', async () => {
    const sqlite3 = require('sqlite3').verbose()
    const db = new sqlite3.Database('../database.db')

    const actual = await cache.fetchFromDB(db, 'ArrestsAll')
    db.close()
    const expected: data.Table = [
      {
        variables: [{ name: 'year', value: data.toInt(2009), type: 'int' }],
        value: data.toInt(2435),
      },
      {
        variables: [{ name: 'year', value: data.toInt(2010), type: 'int' }],
        value: data.toInt(2256),
      },
      {
        variables: [{ name: 'year', value: data.toInt(2011), type: 'int' }],
        value: data.toInt(2130),
      },
      {
        variables: [{ name: 'year', value: data.toInt(2012), type: 'int' }],
        value: data.toInt(2065),
      },
      {
        variables: [{ name: 'year', value: data.toInt(2013), type: 'int' }],
        value: data.toInt(2071),
      },
      {
        variables: [{ name: 'year', value: data.toInt(2014), type: 'int' }],
        value: data.toInt(1965),
      },
      {
        variables: [{ name: 'year', value: data.toInt(2015), type: 'int' }],
        value: data.toInt(1978),
      },
      {
        variables: [{ name: 'year', value: data.toInt(2016), type: 'int' }],
        value: data.toInt(1942),
      },
      {
        variables: [{ name: 'year', value: data.toInt(2017), type: 'int' }],
        value: data.toInt(1820),
      },
      {
        variables: [{ name: 'year', value: data.toInt(2018), type: 'int' }],
        value: data.toInt(1795),
      },
    ]

    assert.deepEqual(actual, expected)
  })
})
