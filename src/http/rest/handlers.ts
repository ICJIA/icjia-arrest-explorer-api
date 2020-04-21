import express from 'express'
import * as data from '../../data/'

function runQuery(
  tbl: data.Table,
  query: { [key: string]: string },
): data.Table | string {
  let result = tbl

  if ('minYear' in query) {
    result = data.filter(result, 'arrestyear', '>=', parseInt(query.minYear))
  }

  if ('maxYear' in query) {
    result = data.filter(result, 'arrestyear', '<=', parseInt(query.maxYear))
  }

  if ('sortBy' in query) {
    query.sortBy.split(',').forEach(param => {
      const [by, orderRaw] = param.split(':')
      const order = orderRaw ? orderRaw.toLowerCase() : undefined
      result = data.sortBy(result, by, order as 'asc' | 'desc' | undefined)
    })
  }

  if ('csv' in query && query.csv.toLowerCase() === 'true') {
    return data.toCSV(result)
  }

  return result
}

export function createHandlerIndex() {
  return (req: express.Request, res: express.Response): void => {
    res.send('Hello World!')
  }
}

export function createHandlerTable(s: data.Service) {
  return (req: express.Request, res: express.Response): void => {
    const tableName = req.path
      .split(/\/|-/)
      .map(str => str.replace(/^\w/, c => c.toUpperCase()))
      .join('')

    const table = s.getTable(tableName)

    if (tableName.substring(0, 3) === 'Ref') {
      res.send(table)
    } else {
      res.send(runQuery(table, req.query as { [key: string]: string }))
    }
  }
}
