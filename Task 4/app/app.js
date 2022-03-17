const path = require("path")
const express = require("express")
const hbs = require("hbs")
const app = express()

const staticDir = path.join(__dirname, "../assets")
const viewsDir = path.join(__dirname, "../resourses/views")
const layoutsDir = path.join(__dirname, "../resourses/layouts")
const customerRoutes = require("../routes/customer.routes")

app.use(express.static(staticDir))
app.set("view engine", "hbs")
app.set("views", viewsDir)
hbs.registerPartials(layoutsDir)
app.use(customerRoutes) //app.use("/users",userRoutes)

module.exports = app