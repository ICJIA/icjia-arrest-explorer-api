import * as data from './../data'

type Storage = {
  tables: { [key: string]: data.Table }
}

const tables: { [key: string]: data.Table } = {
  Arrests: [
    { arrestyear: 2017, value: 1820 },
    { arrestyear: 2018, value: 1795 },
  ],
  ArrestsByOffenseClass: [
    { arrestyear: 2017, offenseclass: 0, value: 162 },
    { arrestyear: 2017, offenseclass: 1, value: 1277 },
    { arrestyear: 2017, offenseclass: 2, value: 81 },
    { arrestyear: 2018, offenseclass: 0, value: 421 },
    { arrestyear: 2018, offenseclass: 1, value: 1253 },
    { arrestyear: 2018, offenseclass: 2, value: 121 },
  ],
}

export function NewStorage(): Storage {
  return {
    tables,
  }
}
