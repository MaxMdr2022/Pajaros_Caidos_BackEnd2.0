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
import { validateToken } from './middlewares/Authentications'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
import { fileUploadMiddleware } from './middlewares/FileUploadMiddleware'

const helper = new PublicationHelper()

@Controller('publication')
export class PublicationController {
  @Get('all')
  @Middleware([validateLimitQuery]) //validateToken,
  async getAllPublications(req: Request, res: Response) {
    const { data } = res.locals
    const publications = await helper.getAllPublications(data)
    res.status(200).send(new ResponseSuccess(publications))
  }

  @Get(':id')
  @Middleware([validatePublicationId])
  async getPublicationById(req: Request, res: Response) {
    const { id } = res.locals
    const publication = await helper.getPublicationById(id)
    res.status(200).send(new ResponseSuccess({ publication }))
  }

  @Post('create/:userId')
  @Middleware([fileUploadMiddleware, validateUserId, validateDataCreate])
  async createPublication(req: Response, res: Response) {
    const { id, data } = res.locals

    const newPublication = await helper.createPublication(id, data)

    res.status(200).send(new ResponseSuccess({ newPublication }))
  }

  @Put('update/:id')
  @Middleware([fileUploadMiddleware, validatePublicationId, validateDataUpdate])
  async updatePublication(req: Request, res: Response) {
    const { id, publication, data } = res.locals
    const publicationUpdated = await helper.updatePublication(id, publication, data)
    res.status(200).send(new ResponseSuccess({ publicationUpdated }))
  }

  @Delete('delete/:id')
  @Middleware([validatePublicationId])
  async deletePublication(req: Request, res: Response) {
    const { id, publication } = res.locals
    const publicationDeleted = await helper.deletePublication(id, publication)
    res.status(200).send(new ResponseSuccess({ publicationDeleted }))
  }
}
