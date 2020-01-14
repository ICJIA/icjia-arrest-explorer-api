import express from 'express'
import morgan from 'morgan'
import * as data from '../../data/'

const runQuery = (
  tbl: data.Table,
  query: { [key: string]: string },
): data.Table => {
  let result = tbl

  if ('minYear' in query) {
    result = data.filter(result, 'year', '>=', data.toInt(query.minYear))
  }

  if ('maxYear' in query) {
    result = data.filter(result, 'year', '<=', data.toInt(query.maxYear))
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

const getIndex = () => {
  return (req: express.Request, res: express.Response): void => {
    res.send('Hello World!')
  }
}

const getArrestsAll = (s: data.Service) => {
  return (req: express.Request, res: express.Response): void => {
    let tbl = s.getArrestsAll()
    tbl = runQuery(tbl, req.query)

    const dto = data.flatten(tbl)

    res.send(dto)
  }
}

const getArrestsByOffenseClass = (s: data.Service) => {
  return (req: express.Request, res: express.Response): void => {
    let tbl = s.getArrestsByOffenseClass()
    tbl = runQuery(tbl, req.query)

    const dto = data.flatten(tbl)

    res.send(dto)
  }
}

export const NewApp = (s: data.Service): express.Express => {
  const app = express()
  app.use(morgan('tiny'))

  const handleIndex = getIndex()
  const handleArrestsAll = getArrestsAll(s)
  const handleArrestsByOffenseClass = getArrestsByOffenseClass(s)

  app.get('/', (req, res) => handleIndex(req, res))
  app.get('/arrests', (req, res) => handleArrestsAll(req, res))
  app.get('/arrests/by-offense-class', (req, res) =>
    handleArrestsByOffenseClass(req, res),
  )

  return app
}
