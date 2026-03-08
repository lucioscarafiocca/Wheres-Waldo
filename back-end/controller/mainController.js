const db = require("../db/queries")

async function validateSelection(req, res) {
  const { name } = req.params
  const { x, y } = req.query
  const character = await db.GetCords(name)
  const cords = JSON.parse(character.coordinates)

  const result = isInRange(Number(x), Number(y), cords)
  if (result) {
    res.json(cords)
  } else {
    res.status(400).json("Wrong name selected or character pos")
  }

  function isInRange(x, y, cords) {
    const bottomY = y - 75
    const topY = y + 75
    const bottomX = x - 50
    const topX = x + 50
    const Incords = []
    cords.forEach((element) => {
      const [x, y] = element
      if (x >= bottomX && x <= topX && y >= bottomY && y <= topY) {
        Incords.push(element)
      }
    })

    const result = Incords.length >= (cords.length / 100) * 75
    return result
    // console.log(Incords.length)
    // console.log(cords.length)
    // console.log(Incords.length >= (cords.length / 100) * 75)
    // const [a, b] = [1984, 690]
    // console.log(a >= bottomX && a <= topX && b >= bottomY && b <= topY)
  }
  // const cords = await db.GetCords("waldo")
  // console.log(JSON.parse(cords.coordinates))
}

module.exports = {
  validateSelection,
}
