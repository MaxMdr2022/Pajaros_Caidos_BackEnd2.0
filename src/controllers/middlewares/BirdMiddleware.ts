import { Request, Response, NextFunction } from 'express'
import { BirdHelper } from '../../helpers/BirdHelper'
import { ErrorCodeType, ErrorResponse } from '../../models/responses/ErrorResponse'
import { UUIDRegex } from '../../utils/RegularsExpressions'
import { isValidNumber } from '../../utils/AuxiliaryFunctions'

const helper = new BirdHelper()

export async function validateBirdId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const bird = await helper.getBirdById(id)

  if (!bird) {
    const message = 'Bird not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.BirdNotFound))
  }
  res.locals.id = id
  return next()
}

export async function validateDataCreateBird(req: Request, res: Response, next: NextFunction) {
  const { name, scientificName, image, location, size, color, description } = req.body

  if (!name || !scientificName || !image || !location || !size || !color || !description) {
    const message =
      'To create a bird you must enter name, scientificName, image, location, size, color and description.'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const validate = {
    name,
    scientificName,
    size,
    color,
    description,
  }

  const props = {
    name: 'string',
    scientificName: 'string',
    size: 'string',
    color: 'string',
    description: 'string',
  }

  const validated = Object.keys(validate).filter((e) => validate[e] !== undefined)

  for (let i = 0; i < validated.length; i++) {
    const key = validated[i]

    if (props[key] !== typeof req.body[key]) {
      const message = `The ${key} must be a ${props[key]}.`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
  }

  if (!Array.isArray(location) || !Array.isArray(image)) {
    const message = `The location and image have to be an array of strings`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const validateImage = image.some((e) => typeof e !== 'string')
  const validateLocation = location.some((e) => typeof e !== 'string')

  if (validateImage || !image[0] || validateLocation || !location[0]) {
    const message = `The image and location have to be an array of strings`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const data = { name, scientificName, image, location, size, color, description }
  res.locals.data = data
  next()
}

export async function validateQuery(req: Request, res: Response, next: NextFunction) {
  const { location, color, limit, birdPerPage, pageNumber, name } = req.query

  if (limit !== undefined && Number(limit) < 1) {
    const message = `The filter parameter must be a positive integer.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }

  if ((pageNumber && !birdPerPage) || (birdPerPage && !pageNumber)) {
    const message = `To paginate, you must provide both pageNumber and birdPerPage.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  } else {
    if (pageNumber && !isValidNumber(pageNumber)) {
      const message = `pageNumber must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
    if (birdPerPage && !isValidNumber(birdPerPage)) {
      const message = `birdPerPage must be a valid number..`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
    }
  }

  const data = { limit, location, color, pageNumber, birdPerPage, name }
  res.locals.data = data
  next()
}

export async function validateDataUpdateBird(req: Request, res: Response, next: NextFunction) {
  const { name, scientificName, image, location, size, color, description } = req.body

  if (!name && !scientificName && !image && !location && !size && !color && !description) {
    const message =
      'To update a bird you must enter name, scientificName, image, location, size, color or description.'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const validate = {
    name,
    scientificName,
    size,
    color,
    description,
  }

  const props = {
    name: 'string',
    scientificName: 'string',
    size: 'string',
    color: 'string',
    description: 'string',
  }

  const validated = Object.keys(validate).filter((e) => validate[e] !== undefined)

  for (let i = 0; i < validated.length; i++) {
    const key = validated[i]

    if (props[key] !== typeof req.body[key]) {
      const message = `The ${key} must be a ${props[key]}.`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
  }

  if (location || image) {
    if ((location && !Array.isArray(location)) || (image && !Array.isArray(image))) {
      const message = `The location and image have to be an array of strings`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    const validateImage = image?.some((e) => typeof e !== 'string')
    const validateLocation = location?.some((e) => typeof e !== 'string')

    if (
      (image && (validateImage || !image[0])) ||
      (location && (validateLocation || !location[0]))
    ) {
      const message = `The image and location have to be an array of strings`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
  }
  const data = { name, scientificName, image, location, size, color, description }
  res.locals.data = data
  next()
}
