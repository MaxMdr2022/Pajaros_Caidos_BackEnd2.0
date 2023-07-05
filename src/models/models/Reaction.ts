import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Reaction = sequelize.define(
    'reaction',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      reaction: {
        type: DataTypes.ENUM('like', 'love', 'laugh', 'sad', 'applause', 'angry', 'free'),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Reaction
}
