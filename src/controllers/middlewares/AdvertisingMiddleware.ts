import { Request, Response, NextFunction } from 'express'
import { AdvertisingHelper } from '../../helpers/AdvertisingHelper'
import { ErrorResponse, ErrorCodeType } from '../../models/responses/ErrorResponse'
import { UUIDRegex } from '../../utils/RegularsExpressions'
import { isValidNumber } from '../../utils/AuxiliaryFunctions'
import { File } from '../../utils/cloudinary/Files'
import { uploadImg } from '../../utils/cloudinary/AuxFunctions'
import { reducerImageSize } from '../../utils/ReducerImageSize/ReducerImageFunction'

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
  const { contact, company } = req.body

  const data: any = {}

  if (!contact || !company) {
    const message = 'To create a Advertising you need contact company and image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (typeof contact !== 'string' || typeof company !== 'string') {
    const message = 'contact and company must be string'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  data.contact = contact
  data.company = company
  data.image = []

  if (!req.files?.image) {
    const message = 'To create a news you need a image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  const { image } = req.files

  const compactImage: any = await reducerImageSize(image)

  const response = await uploadImg(compactImage, File.ADVERTISING)

  if (typeof response === 'string') {
    const message = 'Error Cloudinary response'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  data.image = response

  res.locals.data = data

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
  let { contact, company, deleteImages } = req.body

  // if (deleteImages) {
  //   deleteImages = JSON.parse(deleteImages) // sacar este y cambiar let por const ----------<<<<
  // }

  if (!contact && !company && !deleteImages && !req.files?.newImage) {
    const message = 'To create a Advertising you need contact company or image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if ((contact && typeof contact !== 'string') || (company && typeof company !== 'string')) {
    const message = 'contact and company must be string'
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
      const message = 'To update a advertising you need a newImage'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
    const { newImage } = req.files

    const compactImage: any = await reducerImageSize(newImage)

    const response = await uploadImg(compactImage, File.ADVERTISING)

    if (typeof response === 'string') {
      const message = 'Error Cloudinary response'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    newImages.push(...response)
  }

  res.locals.data = { company, contact, deleteImages, newImages }

  next()
}
