const chalk = require("chalk")
const dealWithJson = require("./dealWithJson")

const findMyCustomerIndex = (customers, key, val) => {
    let i = customers.findIndex(customer => customer[key] == val)
    return i
}

const addCustomer = (customerData) => {
    try {
        if (customerData.name.length < 3) throw new Error("invalid name")
        const customers = dealWithJson.readData()
        customers.push(customerData)
        dealWithJson.writeData(customers)
        console.log(chalk.green("customer Added"))
    } catch (e) {
        console.log(chalk.red(e.message))
    }
}

const showAll = () => {
    try {
        const customers = dealWithJson.readData()
        if (customers.length == 0) throw new Error("There's no Customers yet")
        else {
            customers.forEach(customer => {
                console.log(chalk.blue(`Accumlative Num: ${customer.accNum}, Name: ${customer.name}, Intial Balance: ${customer.intialBalance}, Remainig Balance: ${customer.remainigBalance}, operation: ${customer.operation}`))
            })
        }

    } catch (e) {
        console.log(chalk.red(e.message))

    }

}
const showSingle = (customerAcc) => {
    const customers = dealWithJson.readData()
    const customer = findMyCustomerIndex(customers, "accNum", customerAcc)
    if (customer != -1) console.log(chalk.green(JSON.stringify(customers[customer])))
    else console.log(chalk.red('Not found'))


}

const delSingle = (customerAcc) => {
    const customers = dealWithJson.readData()
    const resAcc = customers.filter(cust => cust.accNum != customerAcc)
        //console.log(resAcc)
    if (customers.length == resAcc.length) return console.log(chalk.red("Not found"))
    dealWithJson.writeData(resAcc)
}

const customerOp = (customerAcc, type, val) => {
    const customers = dealWithJson.readData()
    let i = customers.findIndex(c => c.accNum == customerAcc)
        // console.log(typeof(type))
    customers[i].operation.push(`opType: ${type}, val: ${val}, at: ${Date.now()}`)
    if (type == "add") {
        if (val < 6000)
            customers[i].remainigBalance += val
        else
            console.log(chalk.red("Value greater than 6000"))
    } else {
        if (type == "withdraw" && customers[i].remainigBalance >= val) {
            customers[i].remainigBalance -= val
        } else
            console.log(chalk.red("Can't withdraw"))
    }

    dealWithJson.writeData(customers)
}
module.exports = { addCustomer, showAll, showSingle, delSingle, customerOp }