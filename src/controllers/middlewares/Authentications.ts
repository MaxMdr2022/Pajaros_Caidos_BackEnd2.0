import { Request, Response, NextFunction } from 'express'
import { ErrorCodeType, ErrorResponse } from '../../models/responses/ErrorResponse'
import jwt from 'jsonwebtoken'

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { JWT } = req.cookies

  if (JWT) {
    try {
      jwt.verify(JWT, process.env.SECRET_KEY_JWT)

      next()
    } catch (error) {
      const message = 'INVALID TOKEN'
      return res.status(401).send(new ErrorResponse(message, ErrorCodeType.InvalidToken))
    }
  } else {
    const message = 'ACCESS DENIED'
    return res.status(400).send(new ErrorResponse(message, ErrorCodeType.AccessDenied))
  }

  // const headerToken = req.headers['authorization'] // =>  "Bearer asd12h21g3fgh123ssda22sd32f23"

  // if (headerToken !== undefined && headerToken.startsWith('Bearer')) {
  //   try {
  //     const tokenSinBearer = headerToken.slice(7)

  //     jwt.verify(tokenSinBearer, process.env.SECRET_KEY_JWT)

  //     next()
  //   } catch (error) {
  //     const message = 'INVALID TOKEN'
  //     return res.status(401).send(new ErrorResponse(message, ErrorCodeType.InvalidToken))
  //   }
  // } else {
  //   const message = 'ACCESS DENIED'
  //   return res.status(400).send(new ErrorResponse(message, ErrorCodeType.AccessDenied))
  // }
}
