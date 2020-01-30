import express from 'express'
import morgan from 'morgan'
import * as data from '../../data/'
import { createHandlerIndex, createHandlerTable } from './handlers'

export function NewApp(s: data.Service): express.Express {
  const app = express()
  app.use(morgan('tiny'))

  const handleIndex = createHandlerIndex()
  const handleTable = createHandlerTable(s)

  app.get('/', (req, res) => handleIndex(req, res))
  app.get('/arrests', (req, res) => handleTable(req, res))
  app.get('/arrests/by-offense-class', (req, res) => handleTable(req, res))

  return app
}
