import express from 'express'
import morgan from 'morgan'
import * as data from '../../data/'
import {
  createHandlerIndex,
  createHandlerArrestsAll,
  createHandlerArrestsByOffenseClass,
} from './handlers'

export function NewApp(s: data.Service): express.Express {
  const app = express()
  app.use(morgan('tiny'))

  const handleIndex = createHandlerIndex()
  const handleArrestsAll = createHandlerArrestsAll(s)
  const handleArrestsByOffenseClass = createHandlerArrestsByOffenseClass(s)

  app.get('/', (req, res) => handleIndex(req, res))
  app.get('/arrests', (req, res) => handleArrestsAll(req, res))
  app.get('/arrests/by-offense-class', (req, res) =>
    handleArrestsByOffenseClass(req, res),
  )

  return app
}
