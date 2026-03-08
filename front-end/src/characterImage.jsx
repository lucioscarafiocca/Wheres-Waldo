import { useEffect, useState } from "react"
import { useRef } from "react"

function CharacterImage({ src, name, setUserPick }) {
  return (
    <img
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "lightgrey"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "white"
      }}
      onClick={(e) => {
        e.currentTarget.style.border = "2px solid red"
        console.log(name)
        setUserPick({ ...userPick, name: name })
      }}
      src={src}
      alt={name}
    />
  )
}

export default CharacterImage
