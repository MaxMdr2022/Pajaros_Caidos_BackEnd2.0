import mysql from 'mysql2'
import { Sequelize } from 'sequelize'

import UserModel from '../models/models/User'
import CommentModel from '../models/models/Comment'
import BirdModel from '../models/models/Bird'
import PublicationModel from '../models/models/Publication'
import ReactionModel from '../models/models/Reaction'
import CategoryModel from '../models/models/Category'
import ItemModel from '../models/models/Item'
import NewsModel from '../models/models/News'
import AdvertisingModel from '../models/models/Advertising'
import BannerModel from '../models/models/Banner'

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const database = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host: `${DB_HOST}`,
  dialect: 'mysql', // Specify the dialect as 'mysql'
  dialectModule: mysql,
  native: false,
  logging: false,
})

// const database = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
//   host: `${DB_HOST}`,
//   // port: 3306,
//   dialect: 'mysql',
//   dialectModule: mysql,
//   native: false,
//   logging: false,
//   // dialectOptions: {
//   //   ssl: {
//   //     require: true, // Habilitar SSL
//   //     rejectUnauthorized: false,
//   //   },
//   // },
// })

const UserListModel = UserModel(database)
const CommentsListModel = CommentModel(database)
const BirdsListModel = BirdModel(database)
const PublicationsListModel = PublicationModel(database)
const ReactionsListModel = ReactionModel(database)
const ItemListModel = ItemModel(database)
const CategoryListModel = CategoryModel(database)
const NewsListModel = NewsModel(database)
const AdvertisingListModel = AdvertisingModel(database)
const BannerListModel = BannerModel(database)

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

ItemListModel.hasMany(CategoryListModel)
CategoryListModel.belongsTo(ItemListModel)

export {
  UserListModel,
  CommentsListModel,
  PublicationsListModel,
  ReactionsListModel,
  BirdsListModel,
  ItemListModel,
  CategoryListModel,
  NewsListModel,
  AdvertisingListModel,
  BannerListModel,
  database,
}
