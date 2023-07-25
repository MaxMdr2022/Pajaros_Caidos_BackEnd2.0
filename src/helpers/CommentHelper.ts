import { Publication } from '../models/types/Publication'
import { CommentFacade } from '../facades/CommentFacade'
import { Comment } from '../models/types/Comment'

const facade = new CommentFacade()

export class CommentHelper {
  async getCommentById(id: string): Promise<Comment> {
    return await facade.getCommentById(id)
  }

  async createComment(publication: Publication, data: any): Promise<Comment> {
    return await facade.createComment(publication, data)
  }

  async updateComment(id: string, comment: string): Promise<Comment> {
    return await facade.updateComment(id, comment)
  }

  async deleteComment(comment: Comment): Promise<Comment> {
    return await facade.deleteComment(comment)
  }
}
