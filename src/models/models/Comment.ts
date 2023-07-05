import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Comment = sequelize.define(
    'comment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // date: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW,
      //   allowNull: false,
      // },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Comment
}
