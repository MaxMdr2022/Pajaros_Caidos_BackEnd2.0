import { ErrorResponse } from '../models/responses/ErrorResponse'
import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500)

  const msg = `Internal server error: ${err.message || err}`
  const code = err.error

  res.json(new ErrorResponse(msg, code || 'Internal Error'))
}
