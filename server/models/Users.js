import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Message } from "./Message.js";
export const User = sequelize.define("Users", {
  id : {
    type : DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4,
    primaryKey : true
  },
  firstName : {
    type : DataTypes.STRING
  },
  lastName : {
    type : DataTypes.STRING
  }
})

User.hasMany(Message,{
  foreignKey: "UserId",
  sourceKey: "id"
})

Message.belongsTo(User, {
  foreignKey: "UserId",
  targetId: "id"
})