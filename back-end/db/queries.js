const prisma = require("../db/index.js")

async function GetCords(name) {
  const cords = await prisma.character.findUnique({
    where: {
      name: name,
    },
  })
  return cords
}

async function StartTimer(time) {
  const timer = await prisma.timer.create({
    data: {
      StartTime: time,
    },
  })
  return timer
}

module.exports = {
  GetCords,
  StartTimer,
}
