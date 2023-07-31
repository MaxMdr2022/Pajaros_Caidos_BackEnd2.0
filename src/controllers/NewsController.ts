import { Controller, Get, Post, Put, Delete, Middleware } from '@overnightjs/core'
import { Request, Response } from 'express'
import { NewsHelper } from '../helpers/NewsHelper'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
import {
  validateDataCreateNews,
  validateDataUpdate,
  validateId,
  validateQuery,
} from './middlewares/NewsMiddleware'

const helper = new NewsHelper()

@Controller('news')
export class NewsController {
  @Get()
  @Middleware([validateQuery])
  async getNews(req: Request, res: Response) {
    const { filters } = res.locals

    const news = await helper.getAllNews(filters)

    res.status(200).send(new ResponseSuccess({ news }))
  }

  @Get(':id')
  @Middleware([validateId])
  async getNewsById(req: Request, res: Response) {
    const { news } = res.locals

    res.status(200).send(new ResponseSuccess({ news }))
  }

  @Post()
  @Middleware([validateDataCreateNews])
  async createNews(req: Request, res: Response) {
    const { data } = res.locals

    const newNews = await helper.createNews(data)

    res.status(200).send(new ResponseSuccess({ newNews }))
  }

  @Put(':id')
  @Middleware([validateId, validateDataUpdate])
  async updateNews(req: Request, res: Response) {
    const { id, data } = res.locals

    const newsUpdated = await helper.updateNews(id, data)

    res.status(200).send(new ResponseSuccess({ newsUpdated }))
  }

  @Delete(':id')
  @Middleware([validateId])
  async deleteNews(req: Request, res: Response) {
    const { id } = res.locals

    const newsDeleted = await helper.deleteNews(id)

    res.status(200).send(new ResponseSuccess({ newsDeleted }))
  }
}
