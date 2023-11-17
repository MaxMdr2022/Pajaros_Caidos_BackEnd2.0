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
import bcrypt from 'bcrypt'
import UsersAdmins from './utils/admins/UsersAdmins'
import { Op } from 'sequelize'
import { Sequelize } from 'sequelize'

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
  private database: Sequelize
  constructor(database: Sequelize) {
    super()
    this.database = database
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
    this.app.use(
      cors({ origin: ['https://redpajaroscaidos.org', 'http://localhost:3000'], credentials: true })
    )

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
    this.database.sync({ force: false }).then(async () => {
      try {
        await bulkCreateAdmin(this.database)
        this.app.listen(port, async () => {
          console.log(`Server listen in port: ${port}`)
        })
      } catch (error) {
        console.error('Error during initialization:', error)
      }
    })
  }

  //--------------
  // public start(port: number): void {
  //   database.sync({ force: false }).then(async () => {
  //     // Verifica si al menos uno de los usuarios administrativos está presente en la base de datos
  //     const existingAdmins = await UserListModel.findOne({
  //       where: { [Op.or]: UsersAdmins.map((admin) => ({ nick_name: admin.nick_name })) },
  //     });

  //     // Si no se encuentra al menos uno de los usuarios administrativos, crea los usuarios predeterminados
  //     if (!existingAdmins) {
  //       for (const adminData of UsersAdmins) {
  //         const { nick_name, first_name, last_name, avatar, isAdmin, isPrincipalAdmin, userEmailValidate } = adminData;
  //         const hashedPassword = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASS, 10);

  //         await UserListModel.create({
  //           nick_name,
  //           first_name,
  //           last_name,
  //           avatar,
  //           password: hashedPassword,
  //           isAdmin,
  //           isPrincipalAdmin,
  //           userEmailValidate,
  //           // Agrega otras propiedades según sea necesario
  //         });
  //       }
  //     }

  //     // Inicia el servidor después de la inicialización
  //     this.app.listen(port, () => {
  //       console.log(`Server listen in port: ${port}`);
  //     });
  //   });
  // }

  //-------------------- DELETE USER BY ID --------------------------------
  // public start(port: number): void {
  //   database.sync({ force: false }).then(() => {
  //     const userId = [
  //       'c7a55416-1efe-42b4-8e00-9bcad91126fc',
  //       '4fd52c0a-c41f-4683-b64c-1862033d92c0',
  //     ]

  //     UserListModel.destroy({ where: { id: userId } }).then(() => {
  //       this.app.listen(port, async () => {
  //         await bulkCreateAdmin()
  //         console.log(`Server listen in port: ${port}`)
  //       })
  //     })
  //   })
  // }
}
export default StartServer
