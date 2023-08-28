import { Controller, Get, Post, Put, Delete, Middleware } from '@overnightjs/core'
import { Request, Response } from 'express'
import { NewsHelper } from '../helpers/NewsHelper'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
import {
  validateDataCreateBanner,
  validateDataCreateNews,
  validateDataUpdate,
  validateId,
  validateIdBannerImage,
  validateQuery,
} from './middlewares/NewsMiddleware'

import { fileUploadMiddleware } from './middlewares/FileUploadMiddleware'

const helper = new NewsHelper()

@Controller('news')
export class NewsController {
  @Get()
  @Middleware([validateQuery])
  async getNews(req: Request, res: Response) {
    const { filters } = res.locals

    const news = await helper.getAllNews(filters)

    res.status(200).send(new ResponseSuccess(news))
  }

  //----------- Banner ----------------------

  @Get('banner')
  @Middleware([])
  async getBannerImages(req: Request, res: Response) {
    const images = await helper.getAllBannerImages()

    res.status(200).send(new ResponseSuccess({ images }))
  }

  @Get('banner/:id')
  @Middleware([validateIdBannerImage])
  async getBannerImageById(req: Request, res: Response) {
    const { image } = res.locals

    res.status(200).send(new ResponseSuccess({ image }))
  }

  @Get(':id')
  @Middleware([validateId])
  async getNewsById(req: Request, res: Response) {
    const { news } = res.locals

    res.status(200).send(new ResponseSuccess({ news }))
  }

  @Post()
  @Middleware([fileUploadMiddleware, validateDataCreateNews])
  async createNews(req: Request, res: Response) {
    const { data } = res.locals

    const newNews = await helper.createNews(data)

    res.status(200).send(new ResponseSuccess({ newNews }))
  }

  @Put(':id')
  @Middleware([fileUploadMiddleware, validateId, validateDataUpdate])
  async updateNews(req: Request, res: Response) {
    const { id, news, data } = res.locals

    const newsUpdated = await helper.updateNews(id, news, data)

    res.status(200).send(new ResponseSuccess({ newsUpdated }))
  }

  @Delete(':id')
  @Middleware([validateId])
  async deleteNews(req: Request, res: Response) {
    const { id, news } = res.locals

    const newsDeleted = await helper.deleteNews(id, news)

    res.status(200).send(new ResponseSuccess({ newsDeleted }))
  }

  //----------- Banner ----------------------

  @Post('banner')
  @Middleware([fileUploadMiddleware, validateDataCreateBanner])
  async createBannerImage(req: Request, res: Response) {
    const { data } = res.locals

    const newImage = await helper.createBannerImage(data)

    res.status(200).send(new ResponseSuccess({ newImage }))
  }

  @Put('banner/:id') //>>>>>>>>>>>>>>>>> deprecate
  @Middleware([fileUploadMiddleware, validateIdBannerImage, validateDataCreateBanner])
  async updateBannerImage(req: Request, res: Response) {
    const { id, data } = res.locals

    const imageUpdated = await helper.updateBannerImage(id, data)

    res.status(200).send(new ResponseSuccess({ imageUpdated }))
  }

  @Delete('banner/:id')
  @Middleware([validateIdBannerImage])
  async deleteBannerImage(req: Request, res: Response) {
    const { id, image } = res.locals

    const imageDeleted = await helper.deleteBannerImage(id, image)

    res.status(200).send(new ResponseSuccess({ imageDeleted }))
  }
}
