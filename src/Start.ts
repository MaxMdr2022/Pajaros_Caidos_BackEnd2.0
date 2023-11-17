import StartServer from './StartServer'

const port = parseInt(process.env.PORT) || 4501

const server = new StartServer()

server.start(port)
