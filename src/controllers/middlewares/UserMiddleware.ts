import { Request, Response, NextFunction } from 'express'
import { UserHelper } from '../../helpers/UserHelper'
import { ErrorCodeType, ErrorResponse } from '../../models/responses/ErrorResponse'
import { dateFormatRegex, UUIDRegex } from '../../utils/RegularsExpressions'
import bcrypt from 'bcrypt'
const helper = new UserHelper()

export async function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  const { email, password, first_name, last_name } = req.body

  const validate = {
    reqProps: !email || !password || !first_name || !last_name,
    isString:
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof first_name !== 'string' ||
      typeof last_name !== 'string',
  }

  const errorMsg = {
    reqProps: 'To email, password, first_name and last_name is required.',
    isString: 'Values have to be strings.',
  }

  const error = Object.keys(validate).some((key) => validate[key])

  if (error) {
    const keyError = Object.keys(validate).find((e) => validate[e])

    const message = errorMsg[keyError]

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const user = await helper.getUserByEmail(email)

  if (user) {
    const message = `There is a registered user with the email entered: ${email}`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const data = { email, password, first_name, last_name }
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

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const validatePassword = await bcrypt.compare(password, user.password)

  if (!validatePassword) {
    const message = `Invalid password.`

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.email = email
  next()
}

export async function validateFilterQuery(req: Request, res: Response, next: NextFunction) {
  const { filter } = req.query

  if (filter !== undefined && String(filter) !== 'complete') {
    const message = `The value entered: ${String(
      filter
    )} for filter is invalid. Only 'complete' is supported.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }

  res.locals.filter = filter
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
  const { first_name, last_name, nick_name, avatar, phone_number, country, city, birth_date } =
    req.body

  const validate = {
    reqProps:
      !first_name &&
      !last_name &&
      !nick_name &&
      !avatar &&
      !phone_number &&
      !country &&
      !city &&
      !birth_date,
    isString:
      (nick_name && typeof nick_name !== 'string') ||
      (avatar && typeof avatar !== 'string') ||
      (first_name && typeof first_name !== 'string') ||
      (country && typeof country !== 'string') ||
      (city && typeof city !== 'string') ||
      (birth_date && typeof birth_date !== 'string') ||
      (last_name && typeof last_name !== 'string'),
    isNumber: phone_number ? typeof phone_number !== 'number' : false,
    dateFormat: birth_date ? !dateFormatRegex.test(birth_date) : false,
  }

  const errorMsg = {
    reqProps: 'You must enter the property you want to modify.',
    isString: 'Values have to be strings.',
    isNumber: 'Value phone_number has to be number.',
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

  res.locals.data = {
    first_name,
    last_name,
    nick_name,
    avatar,
    phone_number,
    country,
    city,
    birth_date,
  }
  next()
}

export async function validateAdminAction(req: Request, res: Response, next: NextFunction) {
  const { isAdmin, isBanned, isVoluntary } = req.body

  const validate = {
    reqProps: !!isAdmin && !!isBanned && !!isVoluntary,
    isBoolean:
      (!!isAdmin && typeof isAdmin !== 'boolean') ||
      (!!isBanned && typeof isBanned !== 'boolean') ||
      (!!isVoluntary && typeof isVoluntary !== 'boolean'),
  }
  const errorMsg = {
    reqProps: 'You must enter the property you want to modify. isAdmin - isBanned - isVoluntary',
    isBoolean: 'Values have to be booleans.',
  }
  const error = Object.keys(validate).some((key) => validate[key])

  if (error) {
    const keyError = Object.keys(validate).find((e) => validate[e])

    const message = errorMsg[keyError]

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.action = { isAdmin, isBanned, isVoluntary }
  next()
}
