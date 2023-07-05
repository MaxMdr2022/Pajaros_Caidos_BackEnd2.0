import { Request, Response, NextFunction } from 'express'
import { ErrorCodeType, ErrorResponse } from '../../models/responses/ErrorResponse'
import { CommentHelper } from '../../helpers/CommentHelper'
import { PublicationHelper } from '../../helpers/PublicationHelper'
import { UserHelper } from '../../helpers/UserHelper'
import { UUIDRegex } from '../../utils/RegularsExpressions'

const helperComment = new CommentHelper()
const helperPublication = new PublicationHelper()
const helperUser = new UserHelper()

export async function validateCommentId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid comment id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const comment = await helperComment.getCommentById(id)

  if (!comment) {
    const message = 'Comment not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.CommentNotFound))
  }
  res.locals.id = id
  return next()
}

export async function validatePublicationId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid publication id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const publication = await helperPublication.getPublicationById(id)

  if (!publication) {
    const message = 'Publication not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.PublicationNotFound))
  }
  res.locals.id = id
  return next()
}

export async function validateDataCreate(req: Request, res: Response, next: NextFunction) {
  const { comment, idUser } = req.body

  if (!comment || !idUser || typeof comment !== 'string') {
    const message = 'To create a comment, you need to add a comment and IdUser.'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (!UUIDRegex.test(idUser)) {
    const message = 'Invalid user id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const user = await helperUser.getUserById(idUser)

  if (!user) {
    const message = 'User not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.UserNotFound))
  }

  res.locals.data = { comment, idUser }

  next()
}

export async function validateDataUpdate(req: Request, res: Response, next: NextFunction) {
  const { comment } = req.body

  if (!comment || typeof comment !== 'string') {
    const message = 'To create a comment, you need to add a comment (string).'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.comment = comment

  next()
}
