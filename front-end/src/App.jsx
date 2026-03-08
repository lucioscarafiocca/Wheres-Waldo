import { useEffect, useState } from "react"
import { useRef } from "react"
import odlaw from "./assets/Headshot_-_Odlaw.png"
import waldo from "./assets/Headshot_-_Waldo.png"
import wenda from "./assets/Headshot_-_Wenda.png"
import wizard from "./assets/Headshot_-_Wizard.png"
import woof from "./assets/Headshot_-_Woof.png"
import image from "./assets/Wheres-Waldo-Beach-Super-High-Resolution-scaled.jpg"
import "./App.css"
import yellow from "./cords"
import waldob from "./waldo"
import girl from "./girl"
import mage from "./mage"
import axios from "axios"
import CharacterImage from "./characterImage"

function App() {
  const [ctx, setCtx] = useState(null)
  const [active, setActive] = useState(false)
  const [userPick, setUserPick] = useState({})
  // const [array, setArray] = useState([])
  const ref = useRef(null)
  const canvasRef = useRef(null)
  const menuRef = useRef(null)
  const characterImages = [
    [waldo, "waldo"],
    [odlaw, "odlaw"],
    [wenda, "wenda"],
    [wizard, "wizard"],
    [woof, "woof"],
  ]
  function handleVerification() {
    console.log(userPick)
    const { newX, newY, name } = userPick
    if (name !== undefined) {
      axios
        .get(`http://localhost:3000/cords/${name}?x=${newX}&y=${newY}`)
        .then((response) => {
          // console.log(response.data)

          drawBorder(response.data, ctx)
        })
        .catch((error) => console.log(error.response))
    } else {
      console.log("no name given lol")
    }
  }

  function boxHandler(container) {
    if (!active) {
      const width = canvasRef.current.clientWidth
      const height = canvasRef.current.clientHeight
      const x = container.offsetX
      const y = container.offsetY
      const border = ref.current
      border.style.top = `${y - 75}px`
      border.style.left = `${x - 50}px`
      border.style.visibility = "visible"
      menuRef.current.style.visibility = "visible"

      // const pixel = ctx.getImageData(x, y, 1, 1)
      // console.log(pixel)
      // pixel.data[0] = 0
      // pixel.data[1] = 0
      // pixel.data[2] = 0
      // pixel.data[3] = 255
      // ctx.putImageData(pixel, x, y)

      const image = ctx.getImageData(0, 0, 2560, 1644)
      const newX = Math.round((2560 / width).toFixed(3) * x)
      const newY = Math.round((1644 / height).toFixed(3) * y)

      // array.push([x, y])
      // console.log(array)

      image.data[(newY * 2560 + newX) * 4] = 231
      image.data[(newY * 2560 + newX) * 4 + 1] = 0
      image.data[(newY * 2560 + newX) * 4 + 2] = 255
      image.data[(newY * 2560 + newX) * 4 + 3] = 255
      setUserPick({ ...userPick, newX, newY })

      console.log(newY, newX)

      ctx.putImageData(image, 0, 0)

      //drawBorder(girl, ctx)

      // const image2 = ctx.getImageData(0, 0, width, height)
      // const pixel = image2.data[(y * width + x) * 4]
      // const pixel2 = image2.data[(y * width + x) * 4 + 1]
      // const pixel3 = image2.data[(y * width + x) * 4 + 2]
      // const pixel4 = image2.data[(y * width + x) * 4 + 3]

      setActive(true)
    } else {
      console.log("box is on")
    }
  }

  function drawBorder(cords, context, color) {
    const image = context.getImageData(0, 0, 2560, 1644)
    cords.forEach((element) => {
      const [x, y] = element
      image.data[(y * 2560 + x) * 4] = 0
      image.data[(y * 2560 + x) * 4 + 1] = 0
      image.data[(y * 2560 + x) * 4 + 2] = 0
      image.data[(y * 2560 + x) * 4 + 3] = 255
    })
    context.putImageData(image, 0, 0)
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")
    const img = new Image()
    img.src = image
    img.onload = () => ctx.drawImage(img, 0, 0, 2560, 1644)
    ctx.imageSmoothingEnabled = false
    setCtx(ctx)
    // drawSquare(canvasRef.current, ctx, "red")
  }, [])

  return (
    <>
      <div ref={menuRef} className="menu">
        {characterImages.map((element) => {
          return (
            <img
              key={element[1]}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "lightgrey"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white"
              }}
              onClick={(e) => {
                const images = menuRef.current.children
                for (let element of images) {
                  element.style.border = ""
                  e.currentTarget.style.border = "2px solid red"
                }
                setUserPick({ ...userPick, name: element[1] })
              }}
              src={element[0]}
              alt={element[1]}
            />
          )
        })}

        <button onClick={() => handleVerification()}> Confirm</button>
        <button
          onClick={() => {
            const images = menuRef.current.children
            for (let element of images) {
              element.style.border = ""
            }

            ref.current.style.visibility = "hidden"
            menuRef.current.style.visibility = "hidden"
            setActive(false)
          }}
        >
          Cancel
        </button>
      </div>

      {/* <div
        onClick={(e) => boxHandler(e.nativeEvent, e.currentTarget.firstChild)}
        className="container"
      >
        <div ref={ref} className="border"></div>
      </div> */}
      <div
        className="container"
        onClick={(e) => boxHandler(e.nativeEvent, e.currentTarget.firstChild)}
      >
        <div ref={ref} className="border"></div>
        <canvas
          className="canvas"
          ref={canvasRef}
          width={2560}
          height={1644}
        ></canvas>
      </div>
    </>
  )
}

export default App
