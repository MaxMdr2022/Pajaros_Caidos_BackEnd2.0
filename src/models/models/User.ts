import { DataTypes } from 'sequelize'
import { UserInstance } from '../types/User'

const user = (sequelize) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      nick_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.JSON,
        get() {
          const avatarUser = this.getDataValue('avatar')
          if (avatarUser && typeof avatarUser === 'string') {
            return JSON.parse(avatarUser)
          }
          return null
        },
      },
      country: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      province: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        defaultValue: '9999-12-31',
      },
      description: {
        type: DataTypes.TEXT,
      },
      contact: {
        type: DataTypes.STRING,
      },
      emailValidateCode: {
        type: DataTypes.STRING,
      },
      isVoluntary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isPrincipalAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isBanned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      formComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userEmailValidate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      registerWithAuth0: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return User
}

export default user
