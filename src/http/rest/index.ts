import express from 'express'
import morgan from 'morgan'
import * as data from '../../data/'

const getIndex = () => {
  return (req: express.Request, res: express.Response): void => {
    res.send('Hello World!')
  }
}

const getArrestsAll = (s: data.Service) => {
  return (req: express.Request, res: express.Response): void => {
    const tbl = s.getArrestsAll()
    const dto = data.flatten(tbl)
    res.send(dto)
  }
}

const getArrestsByOffenseClass = (s: data.Service) => {
  return (req: express.Request, res: express.Response): void => {
    const tbl = s.getArrestsByOffenseClass()
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
