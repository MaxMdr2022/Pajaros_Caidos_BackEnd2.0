import { Sequelize } from 'sequelize'

import UserModel from '../models/models/User'
import CommentModel from '../models/models/Comment'
import BirdModel from '../models/models/Bird'
import PublicationModel from '../models/models/Publication'
import ReactionModel from '../models/models/Reaction'

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const database = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
)

const UserListModel = UserModel(database)
const CommentsListModel = CommentModel(database)
const BirdsListModel = BirdModel(database)
const PublicationsListModel = PublicationModel(database)
const ReactionsListModel = ReactionModel(database)

UserListModel.hasMany(CommentsListModel)
CommentsListModel.belongsTo(UserListModel)

UserListModel.hasMany(PublicationsListModel)
PublicationsListModel.belongsTo(UserListModel)

UserListModel.hasMany(ReactionsListModel)
ReactionsListModel.belongsTo(UserListModel)

PublicationsListModel.hasMany(CommentsListModel)
CommentsListModel.belongsTo(PublicationsListModel)

PublicationsListModel.hasMany(ReactionsListModel)
ReactionsListModel.belongsTo(PublicationsListModel)

export {
  UserListModel,
  CommentsListModel,
  PublicationsListModel,
  ReactionsListModel,
  BirdsListModel,
  database,
}
