const customer = require("./controllers/customer")
const yargs = require("yargs")
const { string } = require("yargs")

//node index addCustomer --name="eman" --intialBalance=5000
yargs.command({
        command: "addCustomer",
        describe: "used for adding customer",
        builder: {
            name: {
                type: String,
                required: true
            },
            intialBalance: {
                type: Number,
                required: true

            }

        },
        handler: function(argv) {
            let customerData = {
                accNum: Date.now(),
                name: argv.name,
                intialBalance: argv.intialBalance,
                remainigBalance: argv.intialBalance,
                operation: []

            }
            customer.addCustomer(customerData)
        }
    })
    //node index showAll
yargs.command({
        command: "showAll",
        describe: "used for show all customers",
        handler: function() {
            customer.showAll()
        }
    })
    //node index showSingle --accNum=1647104556225
yargs.command({
        command: "showSingle",
        builder: {
            accNum: {
                type: string,
                required: true

            }
        },
        handler: function(argv) {
            customer.showSingle(argv.accNum)
        }

    })
    //node index delSingle --accNum=1647098586515 
yargs.command({
        command: "delSingle",
        builder: {
            accNum: {
                type: string,
                required: true

            }
        },
        handler: function(argv) {
            customer.delSingle(argv.accNum)
        }

    })
    //node index operationType --op="withdraw" --accNum=1647104542882  --val=100
yargs.command({
    command: "operationType",
    describe: "used for add or withdraw balance",
    builder: {
        op: {
            type: String,
            required: true
        },
        accNum: {
            required: true,
            type: String
        },
        val: {
            required: true,
            type: Number
        }
    },
    handler: function(argv) {
        customer.customerOp(argv.accNum, argv.op, argv.val)
    }
})

yargs.argv