import sqlite3 from 'sqlite3'
import * as data from './../data'

type Storage = {
  getArrestsAll: () => data.Table
  getArrestsByOffenseClass: () => data.Table
}

export async function fetchFromDB(
  db: sqlite3.Database,
  tableName: string,
): Promise<data.Table> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(`SELECT * FROM "${tableName}"`, (err: Error, tbl) => {
        if (err) reject(err)
        else resolve(tbl)
      })
    })
  })
}

async function init(): Promise<data.Table[]> {
  const sqlite3 = require('sqlite3').verbose()
  const db = new sqlite3.Database('../database.db')

  const arrestsAll = await fetchFromDB(db, 'ArrestsAll')
  const arrestsByOffenseClass = await fetchFromDB(db, 'ArrestsByOffenseClass')

  db.close()

  return [arrestsAll, arrestsByOffenseClass]
}

export async function NewStorage(): Promise<Storage> {
  const [arrestsAll, arrestsByOffenseClass] = await init()

  return {
    getArrestsAll: (): data.Table => arrestsAll,
    getArrestsByOffenseClass: (): data.Table => arrestsByOffenseClass,
  }
}
