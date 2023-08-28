import { DataTypes } from 'sequelize'

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
        defaultValue: '-',
        // allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        defaultValue: '-',
        // allowNull: false,
      },
      nick_name: {
        type: DataTypes.STRING,
        defaultValue: '-',
        // allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      avatar: {
        type: DataTypes.JSON,
        defaultValue: '-',
        // allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        defaultValue: '-',
        // allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: '-',
        // allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        // allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        defaultValue: '9999-12-31',
        // allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: '-',
        // allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        defaultValue: '-',
        // allowNull: false,
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
