import { Controller, Middleware, Get, Post, Put, Patch, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
import { ItemHelper } from '../helpers/ItemHelper'
import {
  validateCategoryCreation,
  validateCategoryId,
  validateCategoryUpdate,
  validateDataItemUpdate,
  validateItemCreation,
  validateItemId,
  validateItemQuery,
  validateRemoveCategory,
} from './middlewares/ItemMiddleware'
import { fileUploadMiddleware } from './middlewares/FileUploadMiddleware'

const helper = new ItemHelper()

@Controller('shop')
export class ItemController {
  @Post('item')
  @Middleware([fileUploadMiddleware, validateItemCreation])
  async createItem(req: Request, res: Response) {
    const { data } = res.locals

    const newItem = await helper.createItem(data)

    res.status(200).send(new ResponseSuccess({ newItem }))
  }

  @Get('items')
  @Middleware([validateItemQuery])
  async getItems(req: Request, res: Response) {
    //filtros

    const { data } = res.locals
    const items = await helper.getAllItems(data)

    res.status(200).send(new ResponseSuccess({ items }))
  }

  @Get('item/:id')
  @Middleware([validateItemId])
  async getItemById(req: Request, res: Response) {
    const { item } = res.locals

    res.status(200).send(new ResponseSuccess({ item }))
  }

  @Put('item/:id')
  @Middleware([fileUploadMiddleware, validateItemId, validateDataItemUpdate])
  async updateItem(req: Request, res: Response) {
    const { data, id } = res.locals

    const itemUpdated = await helper.updateItem(id, data)

    res.status(200).send(new ResponseSuccess({ itemUpdated }))
  }

  @Patch('item/:id')
  @Middleware([validateItemId, validateRemoveCategory])
  async removeCategory(req: Request, res: Response) {
    const { item, category } = res.locals

    const itemUpdated = await helper.removeCategory(item, category)

    res.status(200).send(new ResponseSuccess({ itemUpdated }))
  }

  @Delete('item/:id')
  @Middleware([validateItemId])
  async deleteItem(req: Request, res: Response) {
    const { id, item } = res.locals

    const itemDeleted = await helper.deleteItem(id, item)

    res.status(200).send(new ResponseSuccess({ itemDeleted }))
  }

  @Post('category')
  @Middleware([validateCategoryCreation])
  async createCategory(req: Request, res: Response) {
    const { name } = res.locals

    const newCategory = await helper.createCategory(name)

    res.status(200).send(new ResponseSuccess({ newCategory }))
  }

  @Get('category')
  @Middleware([])
  async getCategories(req: Request, res: Response) {
    const categories = await helper.getAllCategories()

    res.status(200).send(new ResponseSuccess({ categories }))
  }

  @Put('category/:id')
  @Middleware([validateCategoryId, validateCategoryUpdate])
  async updateCategory(req: Request, res: Response) {
    const { name, id } = res.locals

    const categoryUpdated = await helper.updateCategory(id, name)

    res.status(200).send(new ResponseSuccess({ categoryUpdated }))
  }

  @Delete('category/:id')
  @Middleware([validateCategoryId])
  async deleteCategory(req: Request, res: Response) {
    const { id } = res.locals

    const categoryDeleted = await helper.deleteCategory(id)

    res.status(200).send(new ResponseSuccess({ categoryDeleted }))
  }
}
