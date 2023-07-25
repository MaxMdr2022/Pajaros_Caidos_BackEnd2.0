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
    const { user, reaction } = res.locals.data
    const { publication } = res.locals
    const newReaction = await helper.createReaction(publication, user, reaction)

    res.status(200).send(new ResponseSuccess({ newReaction }))
  }

  @Delete('delete/:id')
  @Middleware([validateReactionId])
  async deleteReaction(req: Request, res: Response) {
    const { reaction } = res.locals
    const reactionDeleted = await helper.deleteReaction(reaction)
    res.status(200).send(new ResponseSuccess({ reactionDeleted }))
  }
}
