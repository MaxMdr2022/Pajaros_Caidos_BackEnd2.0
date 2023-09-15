import bcrypt from 'bcrypt'
import { UserFacade } from '../facades/UserFacade'
import { User } from '../models/types/User'
import {
  codeUserVerification,
  mailOption,
  mailOptionGeneratePassword,
  sendEmail,
  transporter,
} from '../utils/nodeMailer/Functions'
import { QueryResponse } from '../models/responses/UserResponse'
import jwt from 'jsonwebtoken'
import { deleteImage } from '../utils/cloudinary/Cloudinary'

const facade = new UserFacade()

export class UserHelper {
  async getAllUsers(data?: string): Promise<QueryResponse | User[]> {
    return await facade.getAllUsers(data)
  }

  async getUserById(id: string, filter?: string): Promise<User> {
    return await facade.getUserById(id, filter)
  }

  async getUserByEmail(email: string): Promise<User> {
    return await facade.getUserByEmail(email)
  }

  async checkNickName(nick: string): Promise<boolean> {
    return await facade.checkNickName(nick)
  }

  async createUser(data: any): Promise<User> {
    const { email, first_name } = data

    const nickName = email.split('@')[0]

    const nameCapitalWord =
      data.last_name.charAt(0).toUpperCase() + data.last_name.slice(1).toLowerCase()

    const code = codeUserVerification()

    const passHashed = await bcrypt.hash(data.password, 10)

    data.password = passHashed
    const userData = {
      ...data,
      nick_name: nickName,
      last_name: nameCapitalWord,
      emailValidateCode: code,
    }

    const newUser = await facade.createUser(userData)
    if (!newUser) return null

    const emailMessage = mailOption(email, first_name, code)

    sendEmail(emailMessage)

    return newUser
  }

  async getJWTUserLogIn(email: string): Promise<string> {
    const token = jwt.sign({ email }, process.env.SECRET_KEY_JWT, { expiresIn: 5 * 60 }) // => 60 seg | "2h" > 2 horas

    return token
  }

  async createUserAuth0(data: any): Promise<User> {
    const userData = {
      ...data,
      userEmailValidate: true,
      registerWithAuth0: true,
    }
    const newUser = await facade.createUser(userData)
    if (!newUser) return null
    return newUser
  }

  async updateUser(id: string, user: User, data: any): Promise<User> {
    const { avatar } = data

    if (avatar && user.avatar.public_id) {
      await deleteImage(user.avatar.public_id)
    }
    await facade.updateUser(id, data)
    const userUpdated = await facade.getUserById(id)
    if (!userUpdated) return null
    return userUpdated
  }

  async adminAction(id: string, action: any): Promise<User> {
    return await facade.updateUser(id, action)
  }

  async userEmailValidated(user: User, code: string): Promise<User> {
    const data = {
      emailValidateCode: code,
      userEmailValidate: true,
    }
    const userUpdated = await facade.updateUser(user.id, data)
    if (!userUpdated) return null
    return userUpdated
  }

  async createNewCode(user: User): Promise<User> {
    const newCode = codeUserVerification()
    const userUpdated = await facade.updateUser(user.id, { emailValidateCode: newCode })

    if (!userUpdated) return null

    const emailMessage = mailOption(user.email, user.first_name, newCode)

    sendEmail(emailMessage)

    return userUpdated
  }

  async generateNewPassword(user: User): Promise<User> {
    const newPass = codeUserVerification()

    const passHashed = await bcrypt.hash(newPass, 10)

    const userUpdated = await facade.updateUser(user.id, { password: passHashed })

    const emailMessage = mailOptionGeneratePassword(user.email, user.first_name, newPass)

    sendEmail(emailMessage)

    return userUpdated
  }

  async updatePassword(id: string, newPassword: string): Promise<User> {
    const passHashed = await bcrypt.hash(newPassword, 10)

    return await facade.updateUser(id, { password: passHashed })
  }
}
