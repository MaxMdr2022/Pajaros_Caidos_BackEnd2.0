import { StatusType } from './StatusType'

type ErrorType = {
  message: string
  code: string
}

export enum ErrorCodeType {
  InternalError = 'INTERNAL_ERROR',
  InvalidBody = 'INVALID_BODY',
  invalidPath = 'INVALID_PATH',
  AccessDenied = 'ACCESS_DENIED',
  InvalidToken = 'INVALID_TOKEN',
  UserNotFound = 'USER_NOT_FOUND',
  PublicationNotFound = 'PUBLICATION_NOT_FOUND',
  CommentNotFound = 'COMMENT_NOT_FOUND',
  ReactionNotFound = 'REACTION_NOT_FOUND',
  BirdNotFound = 'BIRD_NOT_FOUND',
  InvalidParameter = 'INVALID_PARAMETER',
  NewsNotFound = 'NEWS_NOT_FOUND',
  AdvertisingNotFound = 'ADVERTISING_NOT_FOUND',
}

export class ErrorResponse {
  status: StatusType = 'error'
  error: ErrorType

  constructor(msg: string, errorCode) {
    this.error = { message: msg, code: errorCode }
  }
}
