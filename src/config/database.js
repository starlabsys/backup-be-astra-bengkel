require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "doadmin",
    password: "AVNS_Gj2hiA0Z6AeLpgJ_7wb",
    database: "db-astra",
    host: "db-ta-mysql-sgp1-88822-do-user-12614603-0.b.db.ondigitalocean.com",
    dialect: "mysql",
    port: 25060,
    ssl: true
  },
};
