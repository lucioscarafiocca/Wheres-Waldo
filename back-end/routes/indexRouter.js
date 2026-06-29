const { Router } = require("express")
const indexRouter = Router()
const mainController = require("../controller/mainController")

indexRouter.get("/cords/:name", mainController.validateSelection)
indexRouter.post("/timer", mainController.TimerGet)
indexRouter.get("/highscore/:id", mainController.HighscoresGet)
indexRouter.post("/highscore/:id", mainController.HighscoresPost)

module.exports = indexRouter
