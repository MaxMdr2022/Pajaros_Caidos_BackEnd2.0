import { Controller, Get, Middleware, Post, Put, Delete } from '@overnightjs/core'
import { Request, Response } from 'express'
import { PublicationHelper } from '../helpers/PublicationHelper'
import {
  validateDataCreate,
  validateDataUpdate,
  validateLimitQuery,
  validatePublicationId,
  validateUserId,
} from './middlewares/PublicationMiddleware'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
const helper = new PublicationHelper()

@Controller('publication')
export class PublicationController {
  @Get('all')
  @Middleware([validateLimitQuery])
  async getAllPublications(req: Request, res: Response) {
    const { limit } = res.locals
    const publications = await helper.getAllPublications(limit)
    res.status(200).send(new ResponseSuccess({ publications }))
  }

  @Get(':id')
  @Middleware([validatePublicationId])
  async getPublicationById(req: Request, res: Response) {
    const { id } = res.locals
    const publication = await helper.getPublicationById(id)
    res.status(200).send(new ResponseSuccess({ publication }))
  }

  @Post('create/:userId')
  @Middleware([validateUserId, validateDataCreate])
  async createPublication(req: Response, res: Response) {
    const { id, data } = res.locals

    const newPublication = await helper.createPublication(id, data)

    res.status(200).send(new ResponseSuccess({ newPublication }))
  }

  @Put('update/:id')
  @Middleware([validatePublicationId, validateDataUpdate])
  async updatePublication(req: Request, res: Response) {
    const { id, data } = res.locals
    const publicationUpdated = await helper.updatePublication(id, data)
    res.status(200).send(new ResponseSuccess({ publicationUpdated }))
  }

  @Delete('delete/:id')
  @Middleware([validatePublicationId])
  async deletePublication(req: Request, res: Response) {
    const { id } = res.locals
    const publicationDeleted = await helper.deletePublication(id)
    res.status(200).send(new ResponseSuccess({ publicationDeleted }))
  }
}
