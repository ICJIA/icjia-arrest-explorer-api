import dotenv from 'dotenv'
import config from './config'
import * as data from './data'
import * as rest from './http/rest'
import * as cache from './storage/cache'
import * as memory from './storage/memory'
import * as mssql from './storage/mssql'

dotenv.config()

async function main(): Promise<void> {
  let storage
  switch (config.storage) {
    case 'cache':
      storage = await cache.NewStorage('./database.db')
      break
    case 'memory':
      storage = memory.NewStorage()
      break
    case 'mssql':
      storage = await mssql.NewStorage()
  }

  const dataService = data.NewService(storage)
  const app = rest.NewApp(dataService)

  const port = 3000
  app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
  })
}

main()
