import StartServer from './StartServer'
import { database } from './storages/DB'

const port = parseInt(process.env.PORT) || 4501

const server = new StartServer()

server.start(port)
