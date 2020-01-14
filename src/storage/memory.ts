import * as data from './../data'

type Storage = {
  getArrestsAll: () => data.Table
  getArrestsByOffenseClass: () => data.Table
}

const arrestsAll: data.Table = data.unflatten([
  { year: 2017, value: 1820 },
  { year: 2018, value: 1795 },
])
const arrestsByOffenseClass: data.Table = data.unflatten([
  { year: 2017, offenseclass: 0, value: 162 },
  { year: 2017, offenseclass: 1, value: 1277 },
  { year: 2017, offenseclass: 2, value: 81 },
  { year: 2018, offenseclass: 0, value: 421 },
  { year: 2018, offenseclass: 1, value: 1253 },
  { year: 2018, offenseclass: 2, value: 121 },
])

export const NewStorage = (): Storage => ({
  getArrestsAll: (): data.Table => arrestsAll,
  getArrestsByOffenseClass: (): data.Table => arrestsByOffenseClass,
})
