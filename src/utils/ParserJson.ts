import * as bodyParser from 'body-parser'
import { ErrorResponse, ErrorCodeType } from '../models/responses/ErrorResponse'

export const parserJson = () => {
  return (req, res, next) => {
    bodyParser.json()(req, res, (err) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err.toString(), ErrorCodeType.InvalidBody))
      }

      next()
    })
  }
}
