import { Request, Response, NextFunction } from 'express'
import { PublicationHelper } from '../../helpers/PublicationHelper'
import { UserHelper } from '../../helpers/UserHelper'
import { ErrorResponse, ErrorCodeType } from '../../models/responses/ErrorResponse'
import { UUIDRegex } from '../../utils/RegularsExpressions'
import { isValidNumber } from '../../utils/AuxiliaryFunctions'
import { File } from '../../utils/cloudinary/Files'
import { uploadImg } from '../../utils/cloudinary/AuxFunctions'

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
  res.locals.publication = publication
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
  const { title, description } = req.body

  const data: any = {}

  if (!title || !description) {
    const message = 'To create a post, you need to add a title, description, and image.'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  data.title = title
  data.description = description
  data.image = []

  if (!req.files?.image) {
    const message = 'To create a post you need a image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  const { image } = req.files

  const response = await uploadImg(image, File.PUBLICATIONS)

  if (typeof response === 'string') {
    const message = 'Error Cloudinary response'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  data.image = response

  res.locals.data = data

  next()
}

export async function validateDataUpdate(req: Request, res: Response, next: NextFunction) {
  let { title, description, deleteImages } = req.body

  // if (deleteImages) {
  //   deleteImages = JSON.parse(deleteImages) // sacar este y cambiar let por const ----------<<<<
  // }

  if (!title && !description && !deleteImages && !req.files?.newImage) {
    const message = 'To create a post, you need to add a title, description, or image.'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (deleteImages) {
    if (!Array.isArray(deleteImages)) {
      const message = `The deleteImages has to be an array of strings`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    const validateImage = deleteImages.some((e) => typeof e !== 'string')

    if (validateImage || !deleteImages[0]) {
      const message = `The deleteImages  has to be an array of strings (public_id)`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
  }

  const newImages = []

  if (req.files) {
    if (!req.files?.newImage) {
      const message = 'To update a post you need a newImage'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
    const { newImage } = req.files

    const response = await uploadImg(newImage, File.PUBLICATIONS)

    if (typeof response === 'string') {
      const message = 'Error Cloudinary response'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    newImages.push(...response)
  }

  res.locals.data = { title, description, deleteImages, newImages }

  next()
}

export async function validateLimitQuery(req: Request, res: Response, next: NextFunction) {
  const { limit, title, postPerPage, pageNumber, limitComments, orderCreate, filter } = req.query

  if (limit && Number(limit) < 1) {
    const message = `The order limit has to be greater than zero.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (limitComments && Number(limitComments) < 1) {
    const message = `limitComments has to be greater than zero.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if ((pageNumber && !postPerPage) || (postPerPage && !pageNumber)) {
    const message = `To paginate, you must provide both pageNumber and birdPerPage.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  } else {
    if (pageNumber && !isValidNumber(pageNumber)) {
      const message = `pageNumber must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
    if ((postPerPage && !isValidNumber(postPerPage)) || Number(postPerPage) < 1) {
      const message = `postPerPage must be a valid number or greater than one.`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
  }

  if (orderCreate && orderCreate !== 'asc' && orderCreate !== 'desc') {
    const message = `The only valid values are asc and desc`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }

  if (filter && filter !== 'day' && filter !== 'week' && filter !== 'month' && filter !== 'likes') {
    const message = `Query prop invalid: 'filter': ${filter} Only valid values are 'day', 'week', 'month' and 'likes' `
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }

  const data = { limit, title, postPerPage, pageNumber, limitComments, orderCreate, filter }
  res.locals.data = data
  next()
}
