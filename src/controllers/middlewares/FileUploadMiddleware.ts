import { Request, Response, NextFunction } from 'express'

import fileUpload from 'express-fileupload'

export async function fileUploadMiddleware(req: Request, res: Response, next: NextFunction) {
  fileUpload({
    useTempFiles: true,
    tempFileDir: './cloudinaryUploads',
  })(req, res, next)
}
