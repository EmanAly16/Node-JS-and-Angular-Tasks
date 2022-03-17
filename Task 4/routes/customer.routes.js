const router = require("express").Router()
const customerController = require('../app/controllers/customer.controller')

router.get("/", customerController.showAll)
router.get("/add", customerController.addCustomer)
router.get("/op/:id", customerController.customerOp)
router.get("/show/:id", customerController.show)
router.get("/delete/:id", customerController.delSingle)
module.exports = router