const express = require("express")
const app = express()
const indexRouter = require("./routes/indexRouter")
const cors = require("cors")

app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/", indexRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`)
})
