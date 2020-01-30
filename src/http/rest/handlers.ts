import express from 'express'
import * as data from '../../data/'

function runQuery(
  tbl: data.Table,
  query: { [key: string]: string },
): data.Table {
  let result = tbl

  if ('minYear' in query) {
    result = data.filter(result, 'year', '>=', parseInt(query.minYear))
  }

  if ('maxYear' in query) {
    result = data.filter(result, 'year', '<=', parseInt(query.maxYear))
  }

  if ('sortBy' in query) {
    query.sortBy.split(' ').forEach(param => {
      const [by, orderRaw] = param.split(':')
      const order = orderRaw ? orderRaw.toLowerCase() : undefined
      result = data.sortBy(result, by, order as 'asc' | 'desc' | undefined)
    })
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

    let tbl = s.getTable(tableName)
    tbl = runQuery(tbl, req.query)

    res.send(tbl)
  }
}
