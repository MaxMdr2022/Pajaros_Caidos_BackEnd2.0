import * as pg from 'pg'
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

// const database = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
//   {
//     logging: false,
//     native: false,
//     // dialectOptions: {
//     //   ssl: {
//     //     require: true, // Habilitar SSL
//     //     rejectUnauthorized: false, // en desarrollo poner en false
//     //   },
//     // },
//   }
// )

const database = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host: `${DB_HOST}`,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  native: false,
  logging: false,
})

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
  AdvertisingListModel,
  BannerListModel,
  database,
}
