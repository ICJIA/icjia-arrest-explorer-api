import { Table } from './model'

export interface Repository {
  getArrestsAll: () => Table
  getArrestsByOffenseClass: () => Table
}

export interface Service {
  getArrestsAll: () => Table
  getArrestsByOffenseClass: () => Table
}

export function NewService(r: Repository): Service {
  return {
    getArrestsAll: r.getArrestsAll,
    getArrestsByOffenseClass: r.getArrestsByOffenseClass,
  }
}
