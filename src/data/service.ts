import { Table } from './model'

export interface Repository {
  tables: { [key: string]: Table }
}

export interface Service {
  getTable: (tableName: string) => Table
}

export function NewService(r: Repository): Service {
  return {
    getTable: (tableName: string): Table => r.tables[tableName],
  }
}
