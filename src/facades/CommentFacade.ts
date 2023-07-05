import { PostgresDBStorage } from '../storages/PostgresDBStorage'
import { Comment } from '../models/types/Comment'

const storage = new PostgresDBStorage()

export class CommentFacade {
  async getCommentById(id: string): Promise<Comment> {
    return await storage.findCommentById(id)
  }

  async createComment(id: string, data: any): Promise<Comment> {
    return await storage.createComment(id, data)
  }

  async updateComment(id: string, comment: string): Promise<Comment> {
    return await storage.updateComment(id, comment)
  }
}
