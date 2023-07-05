import { CommentFacade } from '../facades/CommentFacade'
import { Comment } from '../models/types/Comment'

const facade = new CommentFacade()

export class CommentHelper {
  async getCommentById(id: string): Promise<Comment> {
    return await facade.getCommentById(id)
  }

  async createComment(id: string, data: any): Promise<Comment> {
    return await facade.createComment(id, data)
  }

  async updateComment(id: string, comment: string): Promise<Comment> {
    return await facade.updateComment(id, comment)
  }
}
