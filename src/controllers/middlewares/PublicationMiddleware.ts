import { Request, Response, NextFunction } from 'express'
import { PublicationHelper } from '../../helpers/PublicationHelper'
import { UserHelper } from '../../helpers/UserHelper'
import { ErrorResponse, ErrorCodeType } from '../../models/responses/ErrorResponse'
import { UUIDRegex } from '../../utils/RegularsExpressions'

const helperPublication = new PublicationHelper()
const helperUser = new UserHelper()

export async function validatePublicationId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const publication = await helperPublication.getPublicationById(id)

  if (!publication) {
    const message = 'Publication not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.PublicationNotFound))
  }
  res.locals.id = id
  return next()
}

export async function validateUserId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.userId

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const user = await helperUser.getUserById(id)

  if (!user) {
    const message = 'User not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.UserNotFound))
  }
  res.locals.id = id
  return next()
}

export async function validateDataCreate(req: Request, res: Response, next: NextFunction) {
  const { title, description, image } = req.body

  if (!title || !description || !image) {
    const message = 'To create a post, you need to add a title, description, and image.'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (!Array.isArray(image)) {
    const message = `The image has to be an array of strings`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const validateImage = image.some((e) => typeof e !== 'string')

  if (validateImage || !image[0]) {
    const message = `The image has to be an array of strings`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.data = { title, description, image }

  next()
}

export async function validateDataUpdate(req: Request, res: Response, next: NextFunction) {
  const { title, description, image } = req.body

  if (!title && !description && !image) {
    const message = 'To create a post, you need to add a title, description, or image.'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (image) {
    if (!Array.isArray(image)) {
      const message = `The image has to be an array of strings`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    const validateImage = image.some((e) => typeof e !== 'string')

    if (validateImage || !image[0]) {
      const message = `The image has to be an array of strings`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
  }

  res.locals.data = { title, description, image }

  next()
}
