import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import fileUpload from 'express-fileupload'

export async function fileUploadMiddleware(req: Request, res: Response, next: NextFunction) {
  const tempDir = '/tmp'

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
  })(req, res, next)
}
