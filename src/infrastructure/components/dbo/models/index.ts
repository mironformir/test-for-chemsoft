import { databaseConnection } from "../db";
import { DataTypes } from "sequelize";

// Модель на ограничения целостности Sequelize, подробне в документации написано
export const Component = databaseConnection.define('component', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  concentration: {type: DataTypes.DOUBLE}
})