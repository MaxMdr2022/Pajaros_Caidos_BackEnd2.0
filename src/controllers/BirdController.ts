import { Controller, Get, Middleware, Post, Put } from '@overnightjs/core'
import { BirdHelper } from '../helpers/BirdHelper'
import { Request, Response } from 'express'
import { ResponseSuccess } from '../models/responses/ResponseSuccess'
import {
  validateBirdId,
  validateDataCreateBird,
  validateDataUpdateBird,
  validateQuery,
} from './middlewares/BirdMiddleware'
import { fileUploadMiddleware } from './middlewares/FileUploadMiddleware'

const helper = new BirdHelper()

@Controller('bird')
export class BirdController {
  @Get('all')
  @Middleware([validateQuery])
  async getAllBirds(req: Request, res: Response) {
    const { data } = res.locals

    const birds = await helper.getAllBirds(data)
    if (!birds) {
      const message = 'Birds not found'
      return res.status(400).send({ message })
    }
    res.status(200).send(new ResponseSuccess({ birds }))
  }

  @Post('create')
  @Middleware([fileUploadMiddleware, validateDataCreateBird])
  async createBird(req: Request, res: Response) {
    const { data } = res.locals

    const newBird = await helper.createBird(data)

    res.status(200).send(new ResponseSuccess({ newBird }))
  }

  @Put('update/:id')
  @Middleware([fileUploadMiddleware, validateBirdId, validateDataUpdateBird])
  async updateBird(req: Request, res: Response) {
    const { id, bird, data } = res.locals

    const birdUpdated = await helper.updateBird(id, bird, data)

    res.status(200).send(new ResponseSuccess(birdUpdated))
  }
}
