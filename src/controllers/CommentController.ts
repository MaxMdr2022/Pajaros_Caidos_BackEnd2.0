import { Controller, Get, Middleware, Post, Put, Delete } from '@overnightjs/core'
import { CommentHelper } from '../helpers/CommentHelper'
import { Request, Response } from 'express'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
import {
  validateCommentId,
  validateDataCreate,
  validateDataUpdate,
  validatePublicationId,
} from './middlewares/CommentMiddleware'

const helper = new CommentHelper()

@Controller('comment')
export class CommentController {
  @Get(':id')
  @Middleware([validateCommentId])
  async getCommentById(req: Request, res: Response) {
    const { id } = res.locals
    const comment = await helper.getCommentById(id)
    res.status(200).send(new ResponseSuccess({ comment }))
  }

  @Post('create/:id')
  @Middleware([validatePublicationId, validateDataCreate])
  async createComment(req: Request, res: Response) {
    const { id, data } = res.locals
    const newComment = await helper.createComment(id, data)
    res.status(200).send(new ResponseSuccess({ newComment }))
  }

  @Put('update/:id')
  @Middleware([validateCommentId, validateDataUpdate])
  async updateComment(req: Request, res: Response) {
    const { id, comment } = res.locals
    const newComment = await helper.updateComment(id, comment)
    res.status(200).send(new ResponseSuccess({ newComment }))
  }

  @Delete('delete/:id')
  @Middleware([validateCommentId])
  async deleteComment(req: Request, res: Response) {
    const { id } = res.locals

    const quantityCommentDeleted = await helper.deleteComment(id)

    res.status(200).send(new ResponseSuccess({ quantityCommentDeleted }))
  }
}
