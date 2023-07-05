import { Controller, Delete, Middleware, Post } from '@overnightjs/core'
import { ReactionHelper } from '../helpers/ReactionHelper'
import { Request, Response } from 'express'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
import {
  validateDataCreate,
  validatePublicationId,
  validateReactionId,
} from './middlewares/ReactionMiddleware'

const helper = new ReactionHelper()

@Controller('reaction')
export class ReactionController {
  @Post('create/:id')
  @Middleware([validatePublicationId, validateDataCreate])
  async createReaction(req: Request, res: Response) {
    const { idUser, reaction } = res.locals.data
    const { id } = res.locals
    const newReaction = await helper.createReaction(id, idUser, reaction)

    res.status(200).send(new ResponseSuccess({ newReaction }))
  }

  @Delete('delete/:id')
  @Middleware([validateReactionId])
  async deleteReaction(req: Request, res: Response) {
    const { id } = res.locals
    const reactionDeleted = await helper.deleteReaction(id)
    res.status(200).send(new ResponseSuccess({ reactionDeleted }))
  }
}
