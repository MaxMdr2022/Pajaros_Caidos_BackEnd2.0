import { Controller, Get, Post, Put, Delete, Middleware } from '@overnightjs/core'
import { Request, Response } from 'express'
import { AdvertisingHelper } from '../helpers/AdvertisingHelper'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
import {
  validateDataCreateAdvertising,
  validateDataUpdate,
  validateId,
  validateQuery,
} from './middlewares/AdvertisingMiddleware'

const helper = new AdvertisingHelper()

@Controller('Advertising')
export class AdvertisingController {
  @Get()
  @Middleware([validateQuery])
  async getAdvertising(req: Request, res: Response) {
    const { filters } = res.locals

    const advertising = await helper.getAllAdvertising(filters)

    res.status(200).send(new ResponseSuccess({ advertising }))
  }

  @Get(':id')
  @Middleware([validateId])
  async getAdvertisingById(req: Request, res: Response) {
    const { advertising } = res.locals

    res.status(200).send(new ResponseSuccess({ advertising }))
  }

  @Post()
  @Middleware([validateDataCreateAdvertising])
  async createAdvertising(req: Request, res: Response) {
    const { data } = res.locals

    const newAdvertising = await helper.createAdvertising(data)

    res.status(200).send(new ResponseSuccess({ newAdvertising }))
  }

  @Put(':id')
  @Middleware([validateId, validateDataUpdate])
  async updateAdvertising(req: Request, res: Response) {
    const { id, data } = res.locals

    const advertisingUpdated = await helper.updateAdvertising(id, data)

    res.status(200).send(new ResponseSuccess({ advertisingUpdated }))
  }

  @Delete(':id')
  @Middleware([validateId])
  async deleteAdvertising(req: Request, res: Response) {
    const { id } = res.locals

    const advertisingDeleted = await helper.deleteAdvertising(id)

    res.status(200).send(new ResponseSuccess({ advertisingDeleted }))
  }
}
