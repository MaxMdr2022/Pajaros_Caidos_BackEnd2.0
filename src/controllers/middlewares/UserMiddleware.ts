import { Request, Response, NextFunction } from 'express'
import { UserHelper } from '../../helpers/UserHelper'
import { ErrorCodeType, ErrorResponse } from '../../models/responses/ErrorResponse'
import { dateFormatRegex, UUIDRegex, emailRegex } from '../../utils/RegularsExpressions'
import { isValidNumber } from '../../utils/AuxiliaryFunctions'
import bcrypt from 'bcrypt'
import { File } from '../../utils/cloudinary/Files'
import { uploadImg } from '../../utils/cloudinary/AuxFunctions'
import { reducerImageSize } from '../../utils/ReducerImageSize/ReducerImageFunction'

const helper = new UserHelper()

export async function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  const { email, password, first_name, last_name, phone_number, country, province } = req.body

  //agregar lo otro
  const validate = {
    reqProps:
      !email || !password || !first_name || !last_name || !phone_number || !country || !province,
    isString:
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof first_name !== 'string' ||
      typeof phone_number !== 'string' ||
      typeof country !== 'string' ||
      typeof province !== 'string' ||
      typeof last_name !== 'string',
  }

  const errorMsg = {
    reqProps:
      'To email, password, first_name, last_name, phone_number, country and province are required.',
    isString: 'Values have to be strings.',
  }

  const error = Object.keys(validate).some((key) => validate[key])

  if (error) {
    const keyError = Object.keys(validate).find((e) => validate[e])

    const message = errorMsg[keyError]

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (!emailRegex.test(email)) {
    const message = `The email entered: ${email} .It is not a valid email.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const user = await helper.getUserByEmail(email)

  if (user) {
    const message = `There is a registered user with the email entered: ${email}`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.EmailUsed))
  }

  const data = {
    email,
    password,
    first_name,
    last_name,
    avatar: {
      secure_url:
        'https://res.cloudinary.com/de5xjegp3/image/upload/v1700157241/Assets/456212_yncwde_f2kzcg_bcdjkv.png',
    },
    phone_number,
    province,
    country,
  }
  res.locals.data = data
  next()
}

export async function validateDataLogIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  if (!email || !password) {
    const message = `To log in you must enter email and password.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    const message = `Email and password must be strings.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const user = await helper.getUserByEmail(email)

  if (!user) {
    const message = `There is no registered user with the email: ${email}`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.UserNotFound))
  }

  if (user.registerWithAuth0) {
    const message = `This user must log in with google.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  // if(!user.emailValidateCode){
  //   const message = `The user must validate the email.`

  //   return res.status(404).send(new ErrorResponse(message, ErrorCodeType.ValidateEmailCode))
  // }

  const validatePassword = await bcrypt.compare(password, user.password)

  if (!validatePassword) {
    const message = `Invalid password.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidPassword))
  }

  if (user.isBanned) {
    const message = `User banned.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.UserBanned))
  }

  res.locals.email = email

  user.password = ''
  // console.log('user: ', user)

  res.locals.user = user
  next()
}

export async function validateDataUserAuth0(req: Request, res: Response, next: NextFunction) {
  const { email, avatar, nick_name } = req.body

  const data: any = {}

  if (!email) {
    const message = `No user email received when logging in with Auth0.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const user = await helper.getUserByEmail(email)

  if (user && user.isBanned) {
    const message = `User banned.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.UserBanned))
  }

  data.email = email
  data.nick_name = nick_name
  data.avatar = {
    secure_url:
      'https://res.cloudinary.com/de5xjegp3/image/upload/v1700157241/Assets/456212_yncwde_f2kzcg_bcdjkv.png',
  }

  res.locals.user = user
  res.locals.data = data
  next()
}

export async function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body

  if (!email) {
    const message = `To log in you must enter email.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (typeof email !== 'string') {
    const message = `Email must be strings.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const user = await helper.getUserByEmail(email)

  if (!user) {
    const message = `There is no registered user with the email: ${email}`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.UserNotFound))
  }

  // if(!user.emailValidateCode){
  //   const message = `The user must validate the email.`

  //   return res.status(404).send(new ErrorResponse(message, ErrorCodeType.ValidateEmailCode))
  // }

  res.locals.email = email
  res.locals.user = user
  next()
}

export async function validateFilterQuery(req: Request, res: Response, next: NextFunction) {
  const { verbose, last_name, pageNumber, userPerPage, userStatus, voluntaryType } = req.query

  const types = [
    'General',
    'Redes',
    'Marketing',
    'Presencial',
    'Online',
    'Transito',
    'Programador',
    'Profesional',
  ]

  if (verbose !== undefined && String(verbose) !== 'simple') {
    const message = `The value entered: ${String(
      verbose
    )} for filter is invalid. Only 'simple' is supported.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }

  if (
    userStatus &&
    String(userStatus) !== 'isAdmin' &&
    String(userStatus) !== 'isVoluntary' &&
    String(userStatus) !== 'isDeveloper' &&
    String(userStatus) !== 'isBanned'
  ) {
    const message = `The value entered: ${String(
      userStatus
    )} for filter is invalid. Only 'isAdmin', 'isDeveloper', 'isVoluntary' or 'isBanned' is supported.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }

  if (voluntaryType && !types.find((e) => e === String(voluntaryType))) {
    const message = `The value entered: ${String(
      voluntaryType
    )} for filter is invalid. Only ${types.join('|')} is supported.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }

  if ((pageNumber && !userPerPage) || (userPerPage && !pageNumber)) {
    const message = `To paginate, you must provide both pageNumber and birdPerPage.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  } else {
    if (pageNumber && !isValidNumber(pageNumber)) {
      const message = `pageNumber must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
    if (userPerPage && !isValidNumber(userPerPage)) {
      const message = `birdPerPage must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
  }

  const data = { verbose, last_name, pageNumber, userPerPage, userStatus, voluntaryType }
  res.locals.data = data
  next()
}

export async function validateFilterUserQuery(req: Request, res: Response, next: NextFunction) {
  const { filter } = req.query

  if (
    filter !== undefined &&
    String(filter) !== 'all' &&
    String(filter) !== 'publications' &&
    String(filter) !== 'comments'
  ) {
    const message = `The value entered: ${String(
      filter
    )} for filter is invalid. Only 'all', 'publications' and 'comments' are supported.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }

  res.locals.filter = filter
  next()
}

export async function validateId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const user = await helper.getUserById(id)

  if (!user) {
    const message = 'User not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.UserNotFound))
  }
  res.locals.id = id
  res.locals.user = user
  return next()
}

export async function validateDataUpdate(req: Request, res: Response, next: NextFunction) {
  const {
    first_name,
    last_name,
    nick_name,
    phone_number,
    country,
    city,
    birth_date,
    contact,
    description,
    province,
    age,
  } = req.body

  const validate = {
    reqProps:
      !first_name &&
      !last_name &&
      !nick_name &&
      !phone_number &&
      !country &&
      !city &&
      !birth_date &&
      !contact &&
      !province &&
      !age &&
      !description &&
      !req.files,
    isString:
      (nick_name && typeof nick_name !== 'string') ||
      (first_name && typeof first_name !== 'string') ||
      (country && typeof country !== 'string') ||
      (city && typeof city !== 'string') ||
      (birth_date && typeof birth_date !== 'string') ||
      (last_name && typeof last_name !== 'string') ||
      (province && typeof province !== 'string') ||
      (phone_number && typeof phone_number !== 'string') ||
      (contact && typeof contact !== 'string'),
    dateFormat: birth_date ? !dateFormatRegex.test(birth_date) : false,
  }

  const errorMsg = {
    reqProps: 'You must enter the property you want to modify.',
    isString: 'Values have to be strings.',
    dateFormat: 'The date of birth format entered is incorrect. Must be year-month-day',
  }

  const error = Object.keys(validate).some((key) => validate[key])

  if (error) {
    const keyError = Object.keys(validate).find((e) => validate[e])

    const message = errorMsg[keyError]

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (nick_name) {
    const nickNameChecked = await helper.checkNickName(nick_name)

    if (nickNameChecked) {
      const message = `There is already a user with the nick ${nick_name}`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
  }

  const newImage: any = {}

  if (req.files) {
    if (!req.files?.avatar) {
      const message = 'To update a user you need a avatar'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
    const { avatar } = req.files

    const compactImage: any = await reducerImageSize(avatar)

    const response = await uploadImg(compactImage, File.USER)

    if (typeof response === 'string') {
      const message = 'Error Cloudinary response'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    newImage.avatar = response[0]
  }

  const updatedData: any = {}

  if (newImage?.avatar !== null || newImage?.avatar !== undefined) {
    updatedData.avatar = newImage.avatar
  }

  const allowedProperties = [
    'first_name',
    'last_name',
    'nick_name',
    'phone_number',
    'country',
    'city',
    'birth_date',
    'description',
    'contact',
    'province',
    'age',
  ]

  for (const property of allowedProperties) {
    if (req.body[property] !== null && req.body[property] !== undefined) {
      updatedData[property] = req.body[property]
    }
  }

  res.locals.data = updatedData
  // res.locals.data = {
  //   first_name,
  //   last_name,
  //   nick_name,
  //   avatar: newImage.avatar, // quedo medio raro xD avatar: {secure_url:"asd", public_id:"asd"}
  //   phone_number,
  //   country,
  //   city,
  //   birth_date,
  //   description,
  //   contact,
  //   province,
  //   age,
  // }
  next()
}

export async function validateNewPassword(req: Request, res: Response, next: NextFunction) {
  const { oldPassword, newPassword } = req.body
  const { user } = res.locals

  if (user.registerWithAuth0) {
    const message = `A user registered with Google cannot change their password.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (!oldPassword || !newPassword) {
    const message = `You must enter the old and new password`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  const validatePassword = await bcrypt.compare(oldPassword, user.password)

  if (!validatePassword) {
    const message = `Invalid password.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidPassword))
  }

  res.locals.newPassword = newPassword
  next()
}

export async function validateAdminAction(req: Request, res: Response, next: NextFunction) {
  const { isAdmin, isBanned, isVoluntary, voluntaryType, isDeveloper } = req.body

  const types = [
    'General',
    'Redes',
    'Marketing',
    'Presencial',
    'Online',
    'Transito',
    'Programador',
    'Profesional',
  ]

  const validate = {
    reqProps: !!isAdmin && !!isBanned && !!isVoluntary && !voluntaryType && !!isDeveloper,
    isBoolean:
      (!!isAdmin && typeof isAdmin !== 'boolean') ||
      (!!isBanned && typeof isBanned !== 'boolean') ||
      (!!isVoluntary && typeof isVoluntary !== 'boolean') ||
      (!!isDeveloper && typeof isDeveloper !== 'boolean'),
    type: voluntaryType && !types.find((e) => e === voluntaryType),
  }
  const errorMsg = {
    reqProps:
      'You must enter the property you want to modify. isAdmin - isBanned - isVoluntary - voluntaryType - isDeveloper',
    isBoolean: 'Values have to be booleans.',
    type: `value incorrect, voluntaryType: ${voluntaryType}. Try ${types.join(' | ')}`,
  }
  const error = Object.keys(validate).some((key) => validate[key])

  if (error) {
    const keyError = Object.keys(validate).find((e) => validate[e])

    const message = errorMsg[keyError]

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.action = { isAdmin, isBanned, isVoluntary, voluntaryType, isDeveloper }
  next()
}
