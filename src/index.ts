import * as data from './data'
import * as rest from './http/rest'
import * as memory from './storage/memory'

const storage = memory.NewStorage()
const dataService = data.NewService(storage)
const app = rest.NewApp(dataService)

const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})
