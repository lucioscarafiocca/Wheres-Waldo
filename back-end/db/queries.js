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

async function GetTime(id) {
  const time = await prisma.timer.findUnique({
    where: {
      id: id,
    },
  })
  return time
}

async function CheckScore(time) {
  const score = await prisma.highscores.findMany({
    where: {
      score: {
        lt: time,
      },
    },
  })
  return score
}

async function StoreFinalTime(id, time) {
  await prisma.timer.update({
    where: { id: id },
    data: { FinalTime: time },
  })
}

async function PostScore(score, username) {
  const user = await prisma.highscores.create({
    data: {
      username: username,
      score: score,
    },
  })
  return user
}
module.exports = {
  GetCords,
  StartTimer,
  GetTime,
  CheckScore,
  StoreFinalTime,
  PostScore,
}
