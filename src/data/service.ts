import { Table } from './model'

export interface Repository {
  getArrestsAll: () => Table
  getArrestsByOffenseClass: () => Table
}

export interface Service {
  getArrestsAll: () => Table
  getArrestsByOffenseClass: () => Table
}

export const NewService = (r: Repository): Service => ({
  getArrestsAll: r.getArrestsAll,
  getArrestsByOffenseClass: r.getArrestsByOffenseClass,
})
