import express from 'express'
import morgan from 'morgan'
import * as data from '../../data/'
import { createHandlerIndex, createHandlerTable } from './handlers'

export function toPath(tableName: string): string {
  return tableName
    .replace(/([A-Z])/g, '-$1')
    .replace('-', '/')
    .replace('-By', '/by')
    .replace('Ref-', 'ref/')
    .toLowerCase()
}

export function NewApp(s: data.Service): express.Express {
  const app = express()
  app.use(morgan('tiny'))

  const handleIndex = createHandlerIndex()
  const handleTable = createHandlerTable(s)

  app.get('/', (req, res) => handleIndex(req, res))
  s.getTableNames().forEach(tableName => {
    app.get(toPath(tableName), (req, res) => handleTable(req, res))
  })

  return app
}
