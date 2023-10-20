import { MySQLDBStorage } from '../storages/MySQLDBStorage'
import { Comment } from '../models/types/Comment'
import { CommentsListModel } from '../storages/DB'

const storage = new MySQLDBStorage()

export class CommentFacade {
  async getCommentById(id: string): Promise<Comment> {
    return await storage.findById(CommentsListModel, id)
  }

  async createComment(publication: any, data: any): Promise<Comment> {
    const { comment, user } = data

    const newComment: Comment = await storage.create(CommentsListModel, { comment })

    await storage.relationship(user, 'addComment', newComment)

    await storage.relationship(publication, 'addComment', newComment)

    return newComment
  }

  async updateComment(id: string, comment: string): Promise<Comment> {
    return await storage.update(CommentsListModel, { comment }, { where: { id } })
  }

  async deleteComment(comment: any): Promise<Comment> {
    const filter: any = {
      where: {
        id: comment.id,
        userId: comment.userId,
        publicationId: comment.publicationId,
      },
    }

    return await storage.delete(CommentsListModel, filter)
  }
}
