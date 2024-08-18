const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")

const userRoute = require("./route/user_route")
const employeeRoute = require("./route/employee_route")

const cors = require("cors")
dotenv.config()

const app = express()
const port = process.env.PORT 

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))

// Endpoint User
app.use('/user', userRoute)

// Endpoint Employee
app.use("/employee", employeeRoute)

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})