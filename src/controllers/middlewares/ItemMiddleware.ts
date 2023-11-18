import { Request, Response, NextFunction } from 'express'
import { ErrorResponse, ErrorCodeType } from '../../models/responses/ErrorResponse'
import { ItemHelper } from '../../helpers/ItemHelper'
import { UUIDRegex } from '../../utils/RegularsExpressions'
import { isValidNumber, isValidOrder, isStringOrNumber } from '../../utils/AuxiliaryFunctions'
import { File } from '../../utils/cloudinary/Files'
import { uploadImg } from '../../utils/cloudinary/AuxFunctions'

const helper = new ItemHelper()

export async function validateItemCreation(req: Request, res: Response, next: NextFunction) {
  let { title, description, price, category } = req.body

  category = Array.isArray(category) ? category : category?.split(',')

  // category = JSON.parse(category) // sacar este y cambiar let por const ----------<<<<

  const data: any = {}

  const validate = { title, description, price, category }
  const requiredFields = ['title', 'description', 'price', 'category']

  for (const field of requiredFields) {
    if (!validate[field] || !isStringOrNumber(validate[field])) {
      const message = `${field} must be provided and must be a string or number.`
      return res.status(400).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
  }

  if (
    !Array.isArray(category) ||
    category.length === 0 ||
    !category.every((e) => typeof e === 'string' && e !== '')
  ) {
    const message = 'category must be a non-empty array of strings.'
    return res.status(400).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const invalidCategory = await helper.checkCategories(category)

  if (invalidCategory && invalidCategory[0] === 'not categories') {
    const message = 'You must create categories before creating an item.'
    return res.status(400).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (invalidCategory) {
    const categories = await helper.getAllCategories()
    const categoryNames = categories.map((e) => e.name)
    const message = `The following categories do not exist: ${invalidCategory.join(
      ', '
    )}. Valid categories are: ${categoryNames.join(', ')}`
    return res.status(400).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (!req.files?.image) {
    const message = 'To create a item you need a image'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  const { image } = req.files

  const response = await uploadImg(image, File.SHOP)

  if (typeof response === 'string') {
    const message = 'Error Cloudinary response'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  data.image = response
  data.title = title
  data.description = description
  data.price = price
  data.category = category

  res.locals.data = data

  next()
}

export async function validateItemId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  if (id && !UUIDRegex.test(id)) {
    const message = `${id} id not valid`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const item = await helper.getItemById(id)

  if (!item) {
    const message = `there is no item with that id`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  res.locals.id = id
  res.locals.item = item
  next()
}

export async function validateDataItemUpdate(req: Request, res: Response, next: NextFunction) {
  let { title, description, price, category, deleteImages } = req.body

  category = Array.isArray(category) ? category : category?.split(',')

  // if (deleteImages || category) {
  //   deleteImages = JSON.parse(deleteImages) // sacar este y cambiar let por const ----------<<<<
  //   category = JSON.parse(category) // sacar este y cambiar let por const ----------<<<<
  // }

  if (!title && !description && !price && !category && !deleteImages && !req.files?.newImage) {
    const message = 'you must enter something to update'

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if ((title && typeof title !== 'string') || (description && typeof description !== 'string')) {
    const message = 'title description string'

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (price && typeof price !== 'number') {
    const message = 'price number'

    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  if (category && category[0]) {
    if (!Array.isArray(category)) {
      const message = `The category has to be an array of strings`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
    const validate = category.some((e) => typeof e !== 'string')

    if (validate || !category[0]) {
      const message = `The category has to be an array of strings`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    const invalidCategory = await helper.checkCategories(category)

    if (invalidCategory && invalidCategory[0] === 'not categories') {
      const message = `You must create categories before creating an item`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    if (invalidCategory) {
      const categories = await helper.getAllCategories()
      const categoryNames = categories.map((e) => e.name)
      const message = `The array entered with the categories: '${invalidCategory.join(
        ' | '
      )}' does not exist. Try entering one with the following categories: '${categoryNames?.join(
        ' | '
      )}'`
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
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
      const message = 'To update a item you need a newImage'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }
    const { newImage } = req.files

    const response = await uploadImg(newImage, File.SHOP)

    if (typeof response === 'string') {
      const message = 'Error Cloudinary response'
      return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    newImages.push(...response)
  }

  const { item } = res.locals
  const data = { title, description, price, category, deleteImages, newImages, item }
  res.locals.data = data

  next()
}

export async function validateRemoveCategory(req: Request, res: Response, next: NextFunction) {
  const { category } = req.body

  if (!category) {
    const message = `you must enter the category you want to remove`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (typeof category !== 'string') {
    const message = `${category} must be string`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const getCategory = await helper.getCategoryByName(category)

  if (!getCategory) {
    const message = `${category} no existe`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.category = getCategory

  next()
}

export async function validateItemQuery(req: Request, res: Response, next: NextFunction) {
  const {
    name,
    category,
    minPrice,
    maxPrice,
    pageNumber,
    itemPerPage,
    limit,
    orderName,
    orderPrice,
    orderCreate,
  } = req.query

  const errors = []

  if (category) {
    const categoriesArray = String(category).split(',')

    const invalidCategories = await helper.checkCategories(categoriesArray)

    if (typeof invalidCategories[0] === 'string') {
      const message = 'not categories'
      return res.status(400).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
    }

    if (invalidCategories.length > 0) {
      const categories = await helper.getAllCategories()
      const categoryNames = categories.map((e) => e.name)
      const message = `The following categories do not exist: ${invalidCategories.join(
        ', '
      )}. Valid categories are: ${categoryNames.join(', ')}`
      errors.push(message)
    }
  }

  if ((minPrice && !maxPrice) || (maxPrice && !minPrice)) {
    errors.push('Both minPrice and maxPrice must be provided.')
  } else if (minPrice && maxPrice && Number(maxPrice) < Number(minPrice)) {
    errors.push('minPrice cannot be greater than maxPrice.')
  }

  if ((pageNumber && !itemPerPage) || (itemPerPage && !pageNumber)) {
    errors.push('To paginate, you must provide both pageNumber and itemPerPage.')
  } else {
    if (pageNumber && !isValidNumber(pageNumber)) {
      errors.push('pageNumber must be a valid number.')
    }
    if (itemPerPage && !isValidNumber(itemPerPage)) {
      errors.push('itemPerPage must be a valid number.')
    }
  }

  if (limit && !isValidNumber(limit)) {
    errors.push('limit must be a valid number.')
  }

  if (orderName && !isValidOrder(orderName)) {
    errors.push('orderName must be "asc" or "desc".')
  }
  if (orderPrice && !isValidOrder(orderPrice)) {
    errors.push('orderPrice must be "asc" or "desc".')
  }
  if (orderCreate && !isValidOrder(orderCreate)) {
    errors.push('orderCreate must be "asc" or "desc".')
  }

  if (errors.length > 0) {
    const errorMessage = errors.join(' ')
    return res.status(400).send(new ErrorResponse(errorMessage, ErrorCodeType.InvalidBody))
  }

  const data = {
    categoriesArray: category ? String(category).split(',') : [],
    name,
    minPrice,
    maxPrice,
    pageNumber: pageNumber ? Number(pageNumber) : undefined,
    itemPerPage: itemPerPage ? Number(itemPerPage) : undefined,
    limit: limit ? Number(limit) : undefined,
    orderName,
    orderPrice,
    orderCreate,
  }

  res.locals.data = data
  next()
}

//------------------------- category -----------------------------------------------------
export async function validateCategoryCreation(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body

  if (!name || typeof name !== 'string') {
    const message = `name strings`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const category = await helper.getCategoryByName(name)

  if (category) {
    const message = `${name} exist`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.name = name
  next()
}

export async function validateCategoryId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  if (id && !UUIDRegex.test(id)) {
    const message = `${id} id not valid`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const category = await helper.getCategoryById(id)

  if (!category) {
    const message = `there is no such category`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }
  res.locals.id = id
  res.locals.category = category
  next()
}

export async function validateCategoryUpdate(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body

  if (name && typeof name !== 'string') {
    const message = `${name} must be a string`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  const categoryName = await helper.getCategoryByName(name)

  if (categoryName) {
    const message = `there is already a category with the name: ${name}`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.name = name

  next()
}
