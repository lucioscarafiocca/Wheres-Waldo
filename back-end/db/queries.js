const prisma = require("../db/index.js")

async function GetCords(name) {
  const cords = await prisma.character.findUnique({
    where: {
      name: name,
    },
  })
  return cords
}

module.exports = {
  GetCords,
}
