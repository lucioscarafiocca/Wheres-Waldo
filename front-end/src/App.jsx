import { useEffect, useState } from "react"
import { useRef } from "react"
import odlaw from "./assets/Headshot_-_Odlaw.png"
import waldo from "./assets/Headshot_-_Waldo.png"
import wenda from "./assets/Headshot_-_Wenda.png"
import wizard from "./assets/Headshot_-_Wizard.png"
import woof from "./assets/Headshot_-_Woof.png"
import image from "./assets/Wheres-Waldo-Beach-Super-High-Resolution-scaled.jpg"
import "./App.css"
import axios from "axios"
import Popup from "./components/Popup"

function App() {
  const [ctx, setCtx] = useState(null)
  const [userPick, setUserPick] = useState({})
  const [id, setId] = useState()
  const [modal, setModal] = useState(false)
  const ref = useRef(null)
  const canvasRef = useRef(null)
  const menuRef = useRef(null)
  const containerRef = useRef(null)

  const characterImages = [
    [waldo, "waldo"],
    [odlaw, "odlaw"],
    [wenda, "wenda"],
    [wizard, "wizard"],
  ]
  const [result, setResult] = useState([])

  function handleVerification(name) {
    console.log(userPick)
    const { newX, newY } = userPick
    axios
      .get(`http://localhost:3000/cords/${name}?x=${newX}&y=${newY}`)
      .then((response) => {
        // console.log(response.data)
        drawBorder(response.data, ctx)
        !result.includes(name) && result.push(name)
        setResult(result)
        if (result.length == 4) {
          setModal(true)
        }
        console.log(result.length)
        ref.current.style.visibility = "hidden"
        menuRef.current.style.visibility = "hidden"
      })
      .catch((error) => {
        console.log(error.response)
        ref.current.style.visibility = "hidden"
        menuRef.current.style.visibility = "hidden"
      })
  }

  function boxHandler(container) {
    let borderX = 0
    let borderY = 0
    let menuY = 0

    if (container.target.clientWidth >= 800) {
      borderX = 50
      borderY = 75
      menuY = 75
    } else {
      borderX = 25
      borderY = 25
      menuY = 50
    }
    const width = canvasRef.current.clientWidth
    const height = canvasRef.current.clientHeight
    const x = container.offsetX
    const y = container.offsetY
    console.log(container)
    console.log(x, y)
    const border = ref.current
    const menu = menuRef.current
    border.style.top = `${y - borderY}px`
    border.style.left = `${x - borderX}px`
    border.style.visibility = "visible"
    menu.style.visibility = "visible"
    menu.style.left = `${x + menuY}px`
    menu.style.top = `${y + 100}px`
    // menu.style.top = `${y - 100}px`
    // menu.style.left = `${x - 75}px`

    // const pixel = ctx.getImageData(x, y, 1, 1)
    // console.log(pixel)
    // pixel.data[0] = 0
    // pixel.data[1] = 0
    // pixel.data[2] = 0
    // pixel.data[3] = 255
    // ctx.putImageData(pixel, x, y)

    const newX = Math.round((2560 / width).toFixed(3) * x)
    const newY = Math.round((1644 / height).toFixed(3) * y)
    setUserPick({ newX, newY })

    // const image = ctx.getImageData(0, 0, 2560, 1644)
    // image.data[(newY * 2560 + newX) * 4] = 231
    // image.data[(newY * 2560 + newX) * 4 + 1] = 0
    // image.data[(newY * 2560 + newX) * 4 + 2] = 255
    // image.data[(newY * 2560 + newX) * 4 + 3] = 255
    // ctx.putImageData(image, 0, 0)

    // console.log(newY, newX)

    //drawBorder(girl, ctx)

    // const image2 = ctx.getImageData(0, 0, width, height)
    // const pixel = image2.data[(y * width + x) * 4]
    // const pixel2 = image2.data[(y * width + x) * 4 + 1]
    // const pixel3 = image2.data[(y * width + x) * 4 + 2]
    // const pixel4 = image2.data[(y * width + x) * 4 + 3]
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

  // function handleResize() {
  //   console.log(containerRef.current.style)
  //   canvasRef.current.style.width = `${(window.innerWidth / 100) * 80}px`
  //   canvasRef.current.style.height = `${(window.innerHeight / 100) * 80}px`
  // }
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")
    const img = new Image()
    img.src = image
    img.onload = () => ctx.drawImage(img, 0, 0, 2560, 1644)
    ctx.imageSmoothingEnabled = false
    setCtx(ctx)

    axios
      .post("http://localhost:3000/timer")
      .then((response) => {
        setId(response.data)
      })
      .catch((error) => {
        console.log(error.response)
      })

    // drawSquare(canvasRef.current, ctx, "red")
  }, [])

  return (
    <>
      <div className="center">
        <div className="header">
          <h1>Wheres Waldo</h1>
        </div>
        <div ref={menuRef} className="menu">
          {characterImages.map((element) => {
            return (
              <img
                key={element[1]}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "lightgrey"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = ""
                }}
                onClick={async () => {
                  handleVerification(element[1])
                }}
                src={element[0]}
                alt={element[1]}
              />
            )
          })}
        </div>

        {/* <div
        onClick={(e) => boxHandler(e.nativeEvent, e.currentTarget.firstChild)}
        className="container"
      >
        <div ref={ref} className="border"></div>
      </div> */}
        <div
          ref={containerRef}
          className="container"
          onClick={(e) => boxHandler(e.nativeEvent)}
        >
          <div ref={ref} className="border"></div>
          <canvas
            className="canvas"
            ref={canvasRef}
            width={2560}
            height={1644}
          ></canvas>
        </div>
        <div className="targets">
          <h3>Characters</h3>
          {characterImages.map((element) => {
            return <img key={element[1]} src={element[0]} />
          })}
        </div>
        <Popup id={id} openModal={modal} />
      </div>
    </>
  )
}

export default App
