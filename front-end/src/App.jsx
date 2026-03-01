import { useEffect, useState } from "react"
import { useRef } from "react"
import waldo from "./assets/Headshot_-_Waldo.png"
import odlaw from "./assets/Headshot_-_Waldo.png"
import wenda from "./assets/Headshot_-_Wenda.png"
import wizard from "./assets/Headshot_-_Wizard.png"
import woof from "./assets/Headshot_-_Woof.png"
import image from "./assets/wg0Npy8.jpeg"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [menu, setMenu] = useState(false)
  const [ctx, setCtx] = useState(null)
  const ref = useRef(null)
  const canvasRef = useRef(null)

  function boxHandler(container, border) {
    const x = container.offsetX
    const y = container.offsetY
    console.log(container.offsetX)
    border.style.top = `${y - 200}px`
    border.style.left = `${x - 200}px`
    border.style.visibility = "visible"
    setMenu(true)
    //const pixel = ctx.getImageData(x - 200, y - 200, 1, 1)
    // console.log(pixel)
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")
    const img = new Image()
    img.src = image
    img.onload = () => ctx.drawImage(img, 0, 0, 2400, 1200)
    const pixel = ctx.getImageData(1, 1, 10, 10)
    console.log(pixel)
    setCtx(ctx)
  }, [])
  return (
    <>
      {menu && (
        <div>
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
            }}
          >
            Cancel
          </button>
        </div>
      )}
      {/* <div
        onClick={(e) => boxHandler(e.nativeEvent, e.currentTarget.firstChild)}
        className="container"
      >
        <div ref={ref} className="border"></div>
      </div> */}
      <canvas
        className="canvas"
        ref={canvasRef}
        width={2400}
        height={1200}
      ></canvas>
    </>
  )
}

export default App
