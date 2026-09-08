import { Sequelize } from "sequelize";
import { dbConfig } from "../../config/db.config";

const sequelize = dbConfig.password
    ? new Sequelize({
          database: dbConfig.name,
          username: dbConfig.user,
          password: dbConfig.password,
          host: dbConfig.host,
          port: dbConfig.port,
          dialect: dbConfig.dialect,
          logging: false,
      })
    : new Sequelize(
          `postgresql://${dbConfig.user}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`,
          {
              dialect: dbConfig.dialect,
              logging: false,
          }
      );

export default sequelize;
