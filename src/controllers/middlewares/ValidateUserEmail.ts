import { Request, Response, NextFunction } from 'express'
import { ErrorCodeType, ErrorResponse } from '../../models/responses/ErrorResponse'

export async function validateUserEmail(req: Request, res: Response, next: NextFunction) {
  const { user } = res.locals
  const { code } = req.body

  if (!code) {
    const message = 'You must enter the code to validate the email.'
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  if (code !== user.emailValidateCode) {
    const message = `The entered ${code} code is not valid.`
    return res.status(404).send(new ErrorResponse(message, ErrorCodeType.InvalidBody))
  }

  res.locals.code = code
  next()
}
