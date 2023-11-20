import { Controller, Get, Middleware, Post, Put, Patch } from '@overnightjs/core'
import { Request, Response } from 'express'
import { UserHelper } from '../helpers/UserHelper'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
import { ErrorResponse, ErrorCodeType } from '../models/responses/ErrorResponse'
import {
  validateAdminAction,
  validateCreateUser,
  validateDataLogIn,
  validateDataUpdate,
  validateDataUserAuth0,
  validateEmail,
  validateFilterQuery,
  validateFilterUserQuery,
  validateId,
  validateNewPassword,
} from './middlewares/UserMiddleware'
import { validateToken } from './middlewares/Authentications'
import { validateUserEmail } from './middlewares/ValidateUserEmail'
import { fileUploadMiddleware } from './middlewares/FileUploadMiddleware'

const helper = new UserHelper()

@Controller('user')
export class UserController {
  @Get('guarden')
  @Middleware([validateToken])
  async authGuarden(req: Request, res: Response) {
    return res.status(200).send(new ResponseSuccess({ access: 'Authorized access' }))
  }

  @Get('all')
  @Middleware([validateToken, validateFilterQuery]) //
  async getUsers(req: Request, res: Response) {
    const { data } = res.locals

    const users = await helper.getAllUsers(data)

    if (!users) {
      const message = 'Users not found'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.UserNotFound))
    }

    return res.status(200).send(new ResponseSuccess({ users }))
  }

  @Get('voluntary')
  @Middleware([validateFilterQuery]) //[ validateFilterQuery]
  async getVoluntariesUsers(req: Request, res: Response) {
    const { data } = res.locals
    data.userStatus = 'isVoluntary'
    const users = await helper.getAllUsers(data)

    if (!users) {
      const message = 'Users not found'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.UserNotFound))
    }

    return res.status(200).send(new ResponseSuccess({ users }))
  }

  @Get('logout')
  @Middleware([])
  async logout(req: Request, res: Response) {
    res.clearCookie('JWT', { sameSite: 'none', secure: true })

    res.status(200).send(new ResponseSuccess({ message: 'Logged out successfully' }))
  }

  @Get(':id')
  @Middleware([validateId, validateFilterUserQuery])
  async getUserById(req: Request, res: Response) {
    const { id, filter } = res.locals

    const user = await helper.getUserById(id, filter)

    res.status(200).send(new ResponseSuccess({ user }))
  }

  @Post('create')
  @Middleware([validateCreateUser])
  async createUser(req: Request, res: Response) {
    const { data } = res.locals

    const newUser = await helper.createUser(data)

    res.status(200).send(new ResponseSuccess({ newUser: { id: newUser.id } }))
  }

  @Post('login-auth0')
  @Middleware([validateDataUserAuth0])
  async loginAuth0(req: Request, res: Response) {
    const { data, user } = res.locals

    const JWT = await helper.getJWTUserLogIn(data.email)

    res.cookie('JWT', JWT, { sameSite: 'none', secure: true })

    if (user) {
      const userEncrypted = await helper.encryptDataUser(user)
      return res.status(200).send(new ResponseSuccess({ user: userEncrypted })) //{user: {...user}}
    }

    const userAuth0 = await helper.createUserAuth0(data)
    const userEncrypted = await helper.encryptDataUser(userAuth0)

    res.status(200).send(new ResponseSuccess({ user: userEncrypted }))
  }

  @Post(':id/validate')
  @Middleware([validateId, validateUserEmail])
  async validateUserEmail(req: Request, res: Response) {
    const { user, code } = res.locals

    const response = await helper.userEmailValidated(user, code)

    if (!response) {
      return res.status(400).send({ userEmailValidate: 'Error email validated.' })
    }
    res
      .status(200)
      .send(new ResponseSuccess({ userEmailValidate: 'Email validated successfully.' }))
  }

  @Patch(':id/code')
  @Middleware([validateId])
  async createNewCodeValidateUserEmail(req: Request, res: Response) {
    const { user } = res.locals

    const response = await helper.createNewCode(user)
    res.status(200).send(new ResponseSuccess({ userEmailValidate: response }))
  }

  @Post('generate-password')
  @Middleware([validateEmail])
  async generateANewPass(req: Request, res: Response) {
    const { user } = res.locals

    await helper.generateNewPassword(user)

    res.status(200).send(new ResponseSuccess({ userPassword: 'Password generated successfully' }))
  }

  @Post('login')
  @Middleware([validateDataLogIn])
  async logIn(req: Request, res: Response) {
    const { email, user } = res.locals

    const JWT = await helper.getJWTUserLogIn(email)

    res.cookie('JWT', JWT, { sameSite: 'none', secure: true })

    //Encriptar data user y mandar asi al front.
    const userEncrypted = await helper.encryptDataUser(user)

    res.status(200).send(new ResponseSuccess({ user: userEncrypted }))
  }

  @Put('update/:id')
  @Middleware([fileUploadMiddleware, validateId, validateDataUpdate])
  async updateUser(req: Request, res: Response) {
    const { data, user, id } = res.locals

    const userUpdated = await helper.updateUser(id, user, data)

    if (!userUpdated) return res.status(404).send('Error al actualizar usuario')
    const userEncrypted = await helper.encryptDataUser(userUpdated)

    res.status(200).send(new ResponseSuccess({ user: userEncrypted }))
  }

  @Put('update-password/:id')
  @Middleware([validateId, validateNewPassword])
  async updatePassword(req: Request, res: Response) {
    const { newPassword, id } = res.locals

    const userUpdated = await helper.updatePassword(id, newPassword)

    res.status(200).send(new ResponseSuccess({ userUpdated }))
  }

  @Patch('admin/:id/action')
  @Middleware([validateId, validateAdminAction])
  async adminActions(req: Request, res: Response) {
    const { action, id } = res.locals

    const userMod = await helper.adminAction(id, action)

    res.status(200).send(new ResponseSuccess({ userMod }))
  }
}
