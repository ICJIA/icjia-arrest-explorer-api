import * as data from './data'
import * as rest from './http/rest'
import * as cache from './storage/cache'
// import * as memory from './storage/memory'

const main = async (): Promise<void> => {
  const storage = await cache.NewStorage()
  // const storage = memory.NewStorage()
  const dataService = data.NewService(storage)
  const app = rest.NewApp(dataService)

  const port = 3000
  app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
  })
}

main()
