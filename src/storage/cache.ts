import sqlite3 from 'sqlite3'
import * as data from './../data'

type Storage = {
  tables: { [key: string]: data.Table }
}

export async function fetchFromDB(
  db: sqlite3.Database,
  sql: string,
): Promise<data.Table> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(sql, (err: Error, tbl) => {
        if (err) reject(err)
        else resolve(tbl)
      })
    })
  })
}

export function buildSqlForTable(name: string): string {
  if (name.substring(0, 3) === 'Ref') {
    return `SELECT * FROM ${name} ORDER BY id, value`
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [head, ...tail] = name.split(/By|And/)
    const order = ['year', ...tail].join(', ').toLowerCase()

    return `SELECT * FROM ${name} ORDER BY ${order}`
  }
}

async function fetchTables(
  db: sqlite3.Database,
): Promise<{ [key: string]: data.Table }> {
  const sql = "SELECT name FROM sqlite_master WHERE type='table'"
  const tableNames = (await fetchFromDB(db, sql)).map(({ name }) => name)

  const tables: { [key: string]: data.Table } = {}
  for (const name of tableNames) {
    tables[name] = await fetchFromDB(db, buildSqlForTable(String(name)))
  }

  return tables
}

export async function NewStorage(pathDB: string): Promise<Storage> {
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database(pathDB)

  const tables = await fetchTables(db)

  db.close()

  return {
    tables,
  }
}
