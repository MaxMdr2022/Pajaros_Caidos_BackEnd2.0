import { UserController } from './controllers/UserController'
import { PublicationController } from './controllers/PublicationController'
import { CommentController } from './controllers/CommentController'
import { ReactionController } from './controllers/ReactionController'
import { BirdController } from './controllers/BirdController'
import { ItemController } from './controllers/ItemController'
import { NewsController } from './controllers/NewsController'
import { AdvertisingController } from './controllers/AdvertisingController'
import { Response, Request } from 'express'
import express from 'express'
import { Server } from '@overnightjs/core'
import { parserJson } from './utils/ParserJson'
import { ErrorResponse, ErrorCodeType } from './models/responses/ErrorResponse'
import { errorHandler } from './utils/HandlerErrors'
import bulkCreateAdmin from './utils/admins/BulkCreateAdmin'
import { database } from './storages/DB'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {
  UserListModel,
  PublicationsListModel,
  CommentsListModel,
  ReactionsListModel,
} from './storages/DB'

const default404 = (req: Request, res: Response) =>
  res
    .status(404)
    .send(
      new ErrorResponse(
        `Method ${req.method} at ${req.path} is not supported.`,
        ErrorCodeType.invalidPath
      )
    )

class StartServer extends Server {
  constructor() {
    super()
    this.app.use(cookieParser())
    this.app.use(parserJson())
    this.app.use(express.json())
    // this.app.use(
    //   fileUpload({
    //     useTempFiles: true,
    //     tempFileDir: './cloudinaryUploads',
    //   })
    // )
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

    super.addControllers([
      new UserController(),
      new PublicationController(),
      new CommentController(),
      new ReactionController(),
      new BirdController(),
      new ItemController(),
      new NewsController(),
      new AdvertisingController(),
    ])

    this.app.use(default404)
    this.app.use(errorHandler)
  }

  public start(port: number): void {
    database.sync({ force: false }).then(() => {
      this.app.listen(port, async () => {
        await bulkCreateAdmin()
        console.log(`Server listen in port: ${port}`)
      })
    })
  }

  //----------------------------------------------------
  // public start(port: number): void {
  //   database.sync({ force: false }).then(() => {
  //     const userId = [
  //       'ebb2bec2-7c14-407a-9d25-63b3acd765eb'
  //     ]

  //     UserListModel.destroy({ where: { id: userId } }).then(() => {
  //       this.app.listen(port, async () => {
  //         await bulkCreateAdmin()
  //         console.log(`Server listen in port: ${port}`)
  //       })
  //     })
  //   })
  //
  // }
}
export default StartServer
