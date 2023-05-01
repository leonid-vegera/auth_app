import { sequelize } from '../utils/db.js';
import { DataTypes } from 'sequelize';
import { User } from './User.js';

export const Token = sequelize.define('token', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'UserId',
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'tokens',
});

Token.belongsTo(User);
User.hasOne(Token);
