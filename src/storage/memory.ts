import * as data from './../data'

type Storage = {
  getTable: (tableName: string) => data.Table
}

const tables: { [key: string]: data.Table } = {
  arrestsAll: [
    { year: 2017, value: 1820 },
    { year: 2018, value: 1795 },
  ],
  arrestsByOffenseClass: [
    { year: 2017, offenseclass: 0, value: 162 },
    { year: 2017, offenseclass: 1, value: 1277 },
    { year: 2017, offenseclass: 2, value: 81 },
    { year: 2018, offenseclass: 0, value: 421 },
    { year: 2018, offenseclass: 1, value: 1253 },
    { year: 2018, offenseclass: 2, value: 121 },
  ],
}

export function NewStorage(): Storage {
  return {
    getTable: (tableName: string): data.Table => tables[tableName],
  }
}
