import { Request, Response, NextFunction } from 'express'
import { AdvertisingHelper } from '../../helpers/AdvertisingHelper'
import { ErrorResponse, ErrorCodeType } from '../../models/responses/ErrorResponse'
import { UUIDRegex } from '../../utils/RegularsExpressions'
import { isValidNumber } from '../../utils/AuxiliaryFunctions'

const helper = new AdvertisingHelper()

export async function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const advertising = await helper.getAdvertisingById(id)

  if (!advertising) {
    const message = 'Advertising not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.AdvertisingNotFound))
  }
  res.locals.id = id
  res.locals.advertising = advertising
  return next()
}

export async function validateDataCreateAdvertising(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { contact, company, image } = req.body

  if (!contact || !company || !image) {
    const message = 'To create a Advertising you need contact company and image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (typeof contact !== 'string' || typeof company !== 'string') {
    const message = 'contact and company must be string'
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

  res.locals.data = { contact, company, image }

  next()
}

export async function validateQuery(req: Request, res: Response, next: NextFunction) {
  const { pageNumber, advertisingPerPage } = req.query

  if ((pageNumber && !advertisingPerPage) || (advertisingPerPage && !pageNumber)) {
    const message = `To paginate, you must provide both pageNumber and AdvertisingPerPage.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  } else {
    if (pageNumber && !isValidNumber(pageNumber)) {
      const message = `pageNumber must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
    if (advertisingPerPage && !isValidNumber(advertisingPerPage)) {
      const message = `birdPerPage must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
  }

  const filters = { pageNumber, advertisingPerPage }

  res.locals.filters = filters

  next()
}

export async function validateDataUpdate(req: Request, res: Response, next: NextFunction) {
  const { contact, company, image } = req.body

  if (!contact && !company && !image) {
    const message = 'To create a Advertising you need contact company or image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if ((contact && typeof contact !== 'string') || (company && typeof company !== 'string')) {
    const message = 'contact and company must be string'
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

  res.locals.data = { contact, company, image }

  next()
}
