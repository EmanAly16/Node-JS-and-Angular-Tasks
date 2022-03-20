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
                    isEmpty: customers.length == 0 ? true : false

                })
            })
    })
}
const show = (req, res) => {
    let customerId = req.params.id
    db((err, connection) => {
        connection.collection("customer").findOne({ _id: new ObjectId(customerId) },
            (e, result) => {
                //console.log(result)

                res.render("show", {
                    pageTitle: "UserData",
                    pageTitle: "Show Customer",
                    customer: result,
                    isEmpty: result.operation.length == 0 ? true : false
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
        let customerData = {
            ...req.body,
            remainigBalance: req.body.intialBalance,
            operation: []
        }
        connection.collection("customer").insertOne(customerData,
            (e, result) => {
                if (e) res.send(e)
                res.redirect("/")
            }
        )
    })
}
const delSingle = (req, res) => {
    let customerId = req.params.id
    db((err, connection) => {
        connection.collection("customer")
            .deleteOne({ _id: new ObjectId(customerId) })
            .then(() => res.redirect("/"))
            .catch(e => res.send(e))
    })
}
const customerOp = (req, res) => {
    let customerId = req.params.id
    db((err, connection) => {
        connection.collection("customer").findOne({ _id: new ObjectId(customerId) },
            (e, result) => {
                //console.log(result)
                res.render("op", {
                    pageTitle: "Operation in Customer",
                    customer: result

                })

            })
    })

}
const customerOpLogic = (req, res) => {
    //console.log(res)
    db(async(err, connection) => {
        if (err) res.send(err)
        const val = parseInt(req.body.val)
            //console.log(val)
        let customerId = req.params.id
        const customer = await connection.collection("customer").findOne({ _id: new ObjectId(customerId) })
        if (req.body.type == "add") {
            if (val < 6000) {
                let resVal = parseInt(customer.remainigBalance) + val
                    //console.log(resVal)
                connection.collection("customer").updateOne({ _id: new ObjectId(req.params.id) }, { $set: { remainigBalance: resVal } })
                    .then(() => {
                        connection.collection("customer").updateOne({ _id: new ObjectId(req.params.id) }, { $push: { operation: { $each: [{ "type": "add", "val": val }] } } })
                        res.redirect("/")
                    })
                    .catch(e => res.send(e))
            } else
                console.log(chalk.red("Value greater than 6000"))
        } else {
            if (req.body.type == "withdraw" && customer.remainigBalance >= val) {
                {
                    let resVal = parseInt(customer.remainigBalance) - val
                    connection.collection("customer").updateOne({ _id: new ObjectId(req.params.id) }, { $set: { remainigBalance: resVal } })
                        .then(() => {
                            connection.collection("customer").updateOne({ _id: new ObjectId(req.params.id) }, { $push: { operation: { $each: [{ "type": "withdraw", "val": val }] } } })
                            res.redirect("/")
                        })
                        .catch(e => res.send(e))
                }
            } else
                console.log(chalk.red("Can't withdraw"))
        }
    })

}

module.exports = { showAll, addCustomer, addLogic, show, delSingle, customerOp, customerOpLogic }