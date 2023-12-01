import { Request, Response, NextFunction } from 'express'
import { NewsHelper } from '../../helpers/NewsHelper'
import { ErrorResponse, ErrorCodeType } from '../../models/responses/ErrorResponse'
import { UUIDRegex } from '../../utils/RegularsExpressions'
import { isValidNumber } from '../../utils/AuxiliaryFunctions'

import { File } from '../../utils/cloudinary/Files'
import { uploadImg } from '../../utils/cloudinary/AuxFunctions'
import { reducerImageSize } from '../../utils/ReducerImageSize/ReducerImageFunction'

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
  const { title, description } = req.body

  const data: any = {}

  if (!title || !description) {
    const message = 'To create a news you need title description and image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (typeof title !== 'string' || typeof description !== 'string') {
    const message = 'Title and description must be string'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  data.title = title
  data.description = description
  data.image = []

  if (!req.files?.image) {
    const message = 'To create a news you need a image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  const { image } = req.files

  const compactImage: any = await reducerImageSize(image)

  const response = await uploadImg(compactImage, File.NEWS)

  if (typeof response === 'string') {
    const message = 'Error Cloudinary response'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  data.image = response

  res.locals.data = data

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
      const message = `newsPerPage must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
  }

  const filters = { pageNumber, newsPerPage }

  res.locals.filters = filters

  next()
}

export async function validateDataUpdate(req: Request, res: Response, next: NextFunction) {
  let { title, description, deleteImages } = req.body

  // if (deleteImages) {
  //   deleteImages = JSON.parse(deleteImages) // sacar este y cambiar let por const ----------<<<<
  // }

  if (!title && !description && !deleteImages && !req.files?.newImage) {
    const message = 'To update a news you need title, description, newImage or deleteImages.'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if ((title && typeof title !== 'string') || (description && typeof description !== 'string')) {
    const message = 'Title and description must be string'
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
      const message = 'To update a news you need a newImage'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
    const { newImage } = req.files

    const compactImage: any = await reducerImageSize(newImage)

    const response = await uploadImg(compactImage, File.NEWS)

    if (typeof response === 'string') {
      const message = 'Error Cloudinary response'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    newImages.push(...response)
  }

  res.locals.data = { title, description, deleteImages, newImages }

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
  const { name } = req.body

  const data: any = {}

  if (!name) {
    const message = 'To create a banner you need name and image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (typeof name !== 'string') {
    const message = 'Name and image must be string'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  data.name = name

  if (!req.files?.image) {
    const message = 'To create a banner you need a image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  const { image } = req.files

  const compactImage: any = await reducerImageSize(image)

  const response = await uploadImg(compactImage, File.BANNER)

  if (typeof response === 'string') {
    const message = 'Error Cloudinary response'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  data.image = response[0]

  res.locals.data = data

  next()
}

export async function validateQueryBanner(req: Request, res: Response, next: NextFunction) {
  const { pageNumber, bannerPerPage } = req.query

  if ((pageNumber && !bannerPerPage) || (bannerPerPage && !pageNumber)) {
    const message = `To paginate, you must provide both pageNumber and bannerPerPage.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  } else {
    if (pageNumber && !isValidNumber(pageNumber)) {
      const message = `pageNumber must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
    if (bannerPerPage && !isValidNumber(bannerPerPage)) {
      const message = `bannerPerPage must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
  }

  const filters = { pageNumber, bannerPerPage }

  res.locals.filters = filters

  next()
}
