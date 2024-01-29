import { sequelize } from "../database/db.js";
import { DataTypes } from "sequelize";

export const Message = sequelize.define("Messages",{
  id : {
    type : DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4,
    primaryKey : true
  },
  content : {
    type : DataTypes.STRING
  }
  },{
    timestamps: true
  }
)