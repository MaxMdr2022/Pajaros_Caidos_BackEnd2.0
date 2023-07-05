import { Request, Response, NextFunction } from 'express'
import { UUIDRegex } from '../../utils/RegularsExpressions'
import { ErrorCodeType, ErrorResponse } from '../../models/responses/ErrorResponse'
import { ReactionHelper } from '../../helpers/ReactionHelper'
import { UserHelper } from '../../helpers/UserHelper'
import { PublicationHelper } from '../../helpers/PublicationHelper'
import { Reactions } from '../../models/types/Reaction'
const helperReaction = new ReactionHelper()
const helperUser = new UserHelper()
const helperPublication = new PublicationHelper()

export async function validateReactionId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id

  if (!UUIDRegex.test(id)) {
    const message = 'Invalid reaction id'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidParameter))
  }
  const reaction = await helperReaction.getReactionById(id)

  if (!reaction) {
    const message = 'Reaction not found'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.ReactionNotFound))
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
  const { reaction, idUser } = req.body

  if (!reaction || !idUser || typeof reaction !== 'string') {
    const message = 'To create a reaction, you need to select a reaction and IdUser.'
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

  const reactionsArray = Object.values(Reactions)

  const reactionValidate = reactionsArray.find((e) => e === reaction)

  if (!reactionValidate) {
    const message = `Reaction: '${reaction}' is invalid. Try with 'love', 'like', 'applause', 'laugh', 'sad', 'free', 'angry'.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.data = { reaction, idUser }

  next()
}
