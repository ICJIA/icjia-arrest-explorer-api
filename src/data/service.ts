import { Table } from './model'

export interface Repository {
  tables: { [key: string]: Table }
}

export interface Service {
  getTable: (tableName: string) => Table
  getTableNames: () => string[]
}

export function NewService(r: Repository): Service {
  return {
    getTable: (tableName: string): Table => r.tables[tableName],
    getTableNames: (): string[] => Object.keys(r.tables),
  }
}
