const db = require("../../models/dbConnection")
const ObjectId = require("mongodb").ObjectId
const showAll = (req, res) => {
    db((err, connection) => {
        connection.collection("customer").find()
            .toArray((e, customers) => {
                if (e) res.send(e)
                res.render("showAll", {
                    pageTitle: "All Customers",
                    customers,
                })
            })
    })
}
const show = (req, res) => {
    let customerId = req.params.id
    db((err, connection) => {
        connection.collection("customer").findOne({ _id: new ObjectId(customerId) },
            (e, result) => {
                res.render("show", {
                    pageTitle: "UserData",
                    pageTitle: "Show Customer",
                    customer: result,
                })
            })
    })
}
const addCustomer = (req, res) => {
    res.render("add", {
        pageTitle: "Add New Customer"
    })
}
const addLogic = (req, res) => {
    db((err, connection) => {
        connection.collection("customer").insertOne(req.body,
            (e, result) => {
                if (e) res.send(e)
                res.redirect("/")
            }
        )
    })
}
module.exports = { showAll, addCustomer, addLogic, show }