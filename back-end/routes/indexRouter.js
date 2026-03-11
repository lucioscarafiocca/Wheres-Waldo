const { Router } = require("express")
const indexRouter = Router()
const mainController = require("../controller/mainController")

indexRouter.get("/cords/:name", mainController.validateSelection)
indexRouter.post("/timer", mainController.TimerGet)

module.exports = indexRouter
