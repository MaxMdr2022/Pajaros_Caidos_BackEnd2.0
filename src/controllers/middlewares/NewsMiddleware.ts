import { Request, Response, NextFunction } from 'express'
import { NewsHelper } from '../../helpers/NewsHelper'
import { ErrorResponse, ErrorCodeType } from '../../models/responses/ErrorResponse'
import { UUIDRegex } from '../../utils/RegularsExpressions'
import { isValidNumber } from '../../utils/AuxiliaryFunctions'

const helper = new NewsHelper()

export async function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const news = await helper.getNewsById(id)

  if (!news) {
    const message = 'News not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.NewsNotFound))
  }
  res.locals.id = id
  res.locals.news = news
  return next()
}

export async function validateDataCreateNews(req: Request, res: Response, next: NextFunction) {
  const { title, description, image } = req.body

  if (!title || !description || !image) {
    const message = 'To create a news you need title description and image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (typeof title !== 'string' || typeof description !== 'string') {
    const message = 'Title and description must be string'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (!Array.isArray(image)) {
    const message = `The image has to be an array of strings`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const validateImage = image.some((e) => typeof e !== 'string')

  if (validateImage || !image[0]) {
    const message = `The image  has to be an array of strings`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.data = { title, description, image }

  next()
}

export async function validateQuery(req: Request, res: Response, next: NextFunction) {
  const { pageNumber, newsPerPage } = req.query

  if ((pageNumber && !newsPerPage) || (newsPerPage && !pageNumber)) {
    const message = `To paginate, you must provide both pageNumber and newsPerPage.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  } else {
    if (pageNumber && !isValidNumber(pageNumber)) {
      const message = `pageNumber must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
    if (newsPerPage && !isValidNumber(newsPerPage)) {
      const message = `birdPerPage must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
  }

  const filters = { pageNumber, newsPerPage }

  res.locals.filters = filters

  next()
}

export async function validateDataUpdate(req: Request, res: Response, next: NextFunction) {
  const { title, description, image } = req.body

  if (!title && !description && !image) {
    const message = 'To create a news you need title description or image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if ((title && typeof title !== 'string') || (description && typeof description !== 'string')) {
    const message = 'Title and description must be string'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (image) {
    if (!Array.isArray(image)) {
      const message = `The image has to be an array of strings`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    const validateImage = image.some((e) => typeof e !== 'string')

    if (validateImage || !image[0]) {
      const message = `The image  has to be an array of strings`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
  }

  res.locals.data = { title, description, image }

  next()
}

//------------------ BANNER -------------------------------

export async function validateIdBannerImage(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const image = await helper.getBannerImageById(id)

  if (!image) {
    const message = 'Banner image not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.NewsNotFound))
  }
  res.locals.id = id
  res.locals.image = image
  return next()
}

export async function validateDataCreateBanner(req: Request, res: Response, next: NextFunction) {
  const { name, image } = req.body

  if (!name || !image) {
    const message = 'To create a news you need title description and image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (typeof name !== 'string' || typeof image !== 'string') {
    const message = 'Name and image must be string'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.data = { name, image }

  next()
}
