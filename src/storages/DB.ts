import { Sequelize } from 'sequelize'

import UserModel from '../models/models/User'
import CommentModel from '../models/models/Comment'
import BirdModel from '../models/models/Bird'
import PublicationModel from '../models/models/Publication'
import ReactionModel from '../models/models/Reaction'
import CategoryModel from '../models/models/Category'
import ItemModel from '../models/models/Item'
import NewsModel from '../models/models/News'

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
const ItemListModel = ItemModel(database)
const CategoryListModel = CategoryModel(database)
const NewsListModel = NewsModel(database)

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

ItemListModel.belongsToMany(CategoryListModel, { through: 'item_category' })
CategoryListModel.belongsToMany(ItemListModel, { through: 'item_category' })

export {
  UserListModel,
  CommentsListModel,
  PublicationsListModel,
  ReactionsListModel,
  BirdsListModel,
  ItemListModel,
  CategoryListModel,
  NewsListModel,
  database,
}
