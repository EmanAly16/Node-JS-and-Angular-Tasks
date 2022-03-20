const chalk = require("chalk")
const req = require("express/lib/request")
const dealWithJson = require("../helpers/dealWithJson")


const addCustomer = (req, res) => {
    let customerData = {
        accNum: Date.now(),
        name: req.query.name,
        intialBalance: parseInt(req.query.intialBalance),
        remainigBalance: parseInt(req.query.intialBalance),
        operation: []
    }
    if (req.query.name && req.query.intialBalance) {
        const customers = dealWithJson.readData()
        customers.push(customerData)
        dealWithJson.writeData(customers)
        res.redirect("/")
    }
    res.render("add", {
        pageTitle: "Add New Customer",
        customerData
    })
}

const showAll = (req, res) => {
    const customers = dealWithJson.readData()
    res.render("showAll", {
        pageTitle: "All Customers",
        customers,
        isEmpty: customers.length == 0 ? true : false
    })

}
const show = (req, res) => {
    const customers = dealWithJson.readData()
    let customer = customers.find(cust => cust.accNum == req.params.id)
        //console.log(customer.operation[0][0])
    res.render("show", {
        pageTitle: "Show Customer",
        customer,
        isEmpty: customer.operation.length == 0 ? true : false

    })

}

const delSingle = (req, res) => {
    const customers = dealWithJson.readData()
    const resAcc = customers.filter(cust => cust.accNum != req.params.id)
    dealWithJson.writeData(resAcc)
    res.redirect("/")
}

const customerOp = (req, res) => {

    let operationData = [
        req.query.type,
        parseInt(req.query.val),
    ]
    if (req.query.type && req.query.val) {
        const customers = dealWithJson.readData()
        let i = customers.findIndex(c => c.accNum == req.params.id)
            // customers[i].operation.push(JSON.stringify({...operationData,
            //     at: Date.now()
            // }))
        let date = Date(Date.now())
        customers[i].operation.push([...operationData, date.toString()])
        console.log(customers[i].operation)
        const val = parseInt(req.query.val)
        if (req.query.type == "add") {
            if (val < 6000)
                customers[i].remainigBalance += val
            else
                console.log(chalk.red("Value greater than 6000"))
        } else {
            if (req.query.type == "withdraw" && customers[i].remainigBalance >= val) {
                customers[i].remainigBalance -= val
            } else
                console.log(chalk.red("Can't withdraw"))
        }
        dealWithJson.writeData(customers)
        res.redirect("/")
    }
    res.render("op", {
        pageTitle: "Operation in Customer",
        operationData
    })
}
module.exports = { showAll, addCustomer, show, delSingle, customerOp }