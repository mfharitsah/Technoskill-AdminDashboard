const { Pool } = require("pg")
const dotenv = require("dotenv")
require("dotenv").config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl:{
        require: true
    }
})

pool.connect().then(() => {
    console.log("Database Connected")
}).catch((err) => {
    console.log(`Error connecting to Database`, err)
})

module.exports = pool 