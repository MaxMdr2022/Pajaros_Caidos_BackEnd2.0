import { Publication } from '../models/types/Publication'
import { User } from '../models/types/User'
import { Comment } from '../models/types/Comment'
import { Reaction } from '../models/types/Reaction'
import { Bird } from '../models/types/Bird'
import { Op } from 'sequelize'
import {
  UserListModel,
  PublicationsListModel,
  CommentsListModel,
  ReactionsListModel,
  BirdsListModel,
} from './DB'

export class PostgresDBStorage {
  async find(): Promise<User[]> {
    const users: User[] = await UserListModel.findAll()

    if (!users || !users[0]) return null
    return users
  }

  async findById(id: string, filter?: string): Promise<User> {
    // add include

    if (!filter) {
      const user = await UserListModel.findByPk(id)

      if (!user) return null

      return user
    }
    if (filter === 'all') {
      const user = await UserListModel.findByPk(id, {
        include: [
          {
            model: PublicationsListModel,
            // attributes: { exclude: ["userId"] },
          },
          {
            model: CommentsListModel,
            // attributes: { exclude: ["userId"] },
          },
          {
            model: ReactionsListModel,
            // attributes: { exclude: ["userId"] },
            // include: [Post, Comment]
          },
        ],
      })

      return user
    }

    if (filter === 'publications') {
      const user = await UserListModel.findByPk(id, {
        include: [
          {
            model: PublicationsListModel,
            // attributes: { exclude: ["userId"] },
          },
        ],
      })

      return user
    }

    const user = await UserListModel.findByPk(id, {
      include: [
        {
          model: CommentsListModel,
          // attributes: { exclude: ["userId"] },
        },
      ],
    })

    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    const userFounded = await UserListModel.findOne({ where: { email } })
    if (!userFounded) return null
    return userFounded
  }
  async findNickName(nick: string): Promise<boolean> {
    const nickFounded = await UserListModel.findOne({ where: { nick_name: nick } })

    return !!nickFounded
  }

  async createUser(data: any): Promise<User> {
    const newUser = await UserListModel.create(data)
    if (!newUser) return null
    return newUser
  }

  async updateUser(id: string, data: any): Promise<User> {
    const updated = await UserListModel.update({ ...data }, { where: { id } })
    if (updated[0] === 1) {
      return await UserListModel.findByPk(id)
    }
    return null
  }
  //-------------------------------PUBLICATION----------------------------------------------------------
  async createPublication(id: string, data: any): Promise<Publication> {
    const newPublication = await PublicationsListModel.create(data)
    // const user = await UserListModel.findByPk(id)

    const user = await UserListModel.findOne({ where: { id } })

    await user.addPublication(newPublication)

    return newPublication
  }

  async findAllPublications(limit?: number): Promise<Publication[]> {
    const publications = await PublicationsListModel.findAll({
      limit,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: UserListModel,
          attributes: ['id', 'avatar', 'nick_name'],
        },
        {
          model: CommentsListModel,
          order: [['createdAt', 'DESC']],
          limit: 2,
          include: [
            {
              model: UserListModel,
              attributes: ['nick_name'],
            },
          ],
        },
        {
          model: ReactionsListModel,
        },
      ],
    })

    if (!publications || !publications[0]) return null
    return publications
  }

  async findPublicationById(id: string): Promise<Publication> {
    const publication = await PublicationsListModel.findByPk(id, {
      include: [
        {
          model: UserListModel,
          attributes: ['id', 'avatar', 'nick_name'],
        },
        {
          model: CommentsListModel,
          order: [['createdAt', 'ASC']],
          include: [
            {
              model: UserListModel,
              attributes: ['nick_name'],
            },
          ],
        },
        {
          model: ReactionsListModel,
        },
      ],
    })
    if (!publication) return null
    return publication
  }

  async updatePublication(id: string, data: any): Promise<Publication> {
    const updated = await PublicationsListModel.update({ ...data }, { where: { id } })
    if (updated[0] === 1) {
      return await PublicationsListModel.findByPk(id)
    }
    return null
  }
  async deletePublication(id: string): Promise<Publication> {
    await CommentsListModel.destroy({ where: { publicationId: id } })
    await ReactionsListModel.destroy({ where: { publicationId: id } })

    const quantityPublicationDeleted = await PublicationsListModel.destroy({
      where: { id },
    })

    return quantityPublicationDeleted
  }

  //----------------COMMENTS--------------------------------------------------------

  async findCommentById(id: string): Promise<Comment> {
    const comment = await CommentsListModel.findByPk(id)
    if (!comment) return null
    return comment
  }

  async createComment(id: string, data: any): Promise<Comment> {
    const { comment, idUser } = data

    const newComment = await CommentsListModel.create({ comment })

    const publication = await PublicationsListModel.findByPk(id)

    const user = await UserListModel.findByPk(idUser)

    await user.addComments(newComment)
    await publication.addComments(newComment)

    return newComment
  }

  async updateComment(id: string, comment: string): Promise<Comment> {
    await CommentsListModel.update({ comment }, { where: { id } })

    const commentUpdated = await CommentsListModel.findByPk(id)
    return commentUpdated
  }

  async deleteComment(id: string): Promise<Comment> {
    const comment = await CommentsListModel.findByPk(id)

    const quantityCommentDeleted = await CommentsListModel.destroy({
      where: { id, userId: comment.userId, publicationId: comment.publicationId },
    })
    return quantityCommentDeleted
  }
  //------------------REACTIONS----------------------------------------------------

  async findReactionById(id: string): Promise<Reaction> {
    const reaction = await ReactionsListModel.findByPk(id)
    if (!reaction) return null
    return reaction
  }

  async createReaction(id: string, idUser: string, reaction: string): Promise<Reaction> {
    const newReaction = await ReactionsListModel.create({ reaction })

    const publication = await PublicationsListModel.findByPk(id)
    if (!publication) return null
    const user = await UserListModel.findByPk(idUser)
    if (!user) return null

    await user.addReactions(newReaction)
    await publication.addReactions(newReaction)

    return newReaction
  }

  async deleteReaction(id: string): Promise<Reaction> {
    const reaction = await ReactionsListModel.findByPk(id)

    const rec = await ReactionsListModel.destroy({
      where: { id, userId: reaction.userId, publicationId: reaction.publicationId },
    })
    return rec
  }
  //--------------------BIRDS------------------------------------------------------
  async findBirdById(id: string): Promise<Bird> {
    const bird = await BirdsListModel.findByPk(id)
    if (!bird) return null
    return bird
  }

  async findAllBirds(limit?: number, filter?: any, order?: string): Promise<Bird[]> {
    //order asc desc by name
    //filter by color, location

    let options: any = {}

    if (limit !== undefined) {
      options.limit = limit
      options.order = [['name', 'DESC']]
    }

    if (filter.location !== undefined) {
      options.where = { location: { [Op.contains]: [filter.location] } }
    } else if (filter.color !== undefined) {
      options.where = { color: { [Op.eq]: filter.color } }
    }

    const birds = await BirdsListModel.findAll(options)

    if (!birds || !birds[0]) return null

    return birds
  }

  async createBird(data: any): Promise<Bird> {
    const newBird = await BirdsListModel.create(data)
    if (!newBird) return null
    return newBird
  }

  async updateBird(id: string, data: any): Promise<Bird> {
    await BirdsListModel.update({ ...data }, { where: { id } })

    const birdUpdated = await BirdsListModel.findByPk(id)
    return birdUpdated
  }
}
