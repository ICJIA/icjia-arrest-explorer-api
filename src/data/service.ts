import { Table } from './model'

export interface Repository {
  getTable: (tableName: string) => Table
}

export interface Service {
  getTable: (tableName: string) => Table
}

export function NewService(r: Repository): Service {
  return {
    getTable: r.getTable,
  }
}
