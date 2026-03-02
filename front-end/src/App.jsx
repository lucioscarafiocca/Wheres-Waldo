import { useEffect, useState } from "react"
import { useRef } from "react"
import waldo from "./assets/Headshot_-_Waldo.png"
import odlaw from "./assets/Headshot_-_Waldo.png"
import wenda from "./assets/Headshot_-_Wenda.png"
import wizard from "./assets/Headshot_-_Wizard.png"
import woof from "./assets/Headshot_-_Woof.png"
import image from "./assets/Wheres-Waldo-Beach-Super-High-Resolution-scaled.jpg"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [menu, setMenu] = useState(false)
  const [ctx, setCtx] = useState(null)
  const [active, setActive] = useState(false)
  const ref = useRef(null)
  const canvasRef = useRef(null)
  const menuRef = useRef(null)

  function boxHandler(container) {
    if (!active) {
      const width = canvasRef.current.clientWidth
      const height = canvasRef.current.clientHeight
      const x = container.offsetX
      const y = container.offsetY
      const border = ref.current
      border.style.top = `${y - 200}px`
      border.style.left = `${x - 200}px`
      border.style.visibility = "visible"
      menuRef.current.style.visibility = "visible"
      setMenu(true)
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

      console.log(x, y)

      image.data[(newY * 2560 + newX) * 4] = 231
      image.data[(newY * 2560 + newX) * 4 + 1] = 0
      image.data[(newY * 2560 + newX) * 4 + 2] = 255
      image.data[(newY * 2560 + newX) * 4 + 3] = 255

      ctx.putImageData(image, 0, 0)

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

  function drawSquare(canvas, context, color) {
    var x = 50
    var y = 100

    context.fillStyle = color
    context.fillRect(x, y, 100, 100)
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")
    const img = new Image()
    img.src = image
    img.onload = () => ctx.drawImage(img, 0, 0, 2560, 1644)
    setCtx(ctx)
    drawSquare(canvasRef.current, ctx, "red")
  }, [])

  return (
    <>
      <div ref={menuRef} className="menu">
        <img src={waldo} alt="waldo" />
        <img src={odlaw} alt="odlaw" />
        <img src={wenda} alt="wenda" />
        <img src={wizard} alt="wizard" />
        <img src={woof} alt="woof" />
        <button
          onClick={() => {
            setMenu(false)
            console.log(ref)
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
