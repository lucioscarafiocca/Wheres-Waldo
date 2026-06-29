import axios from "axios"
import { useEffect, useRef, useState } from "react"

function Popup({ openModal, id }) {
  const ref = useRef(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [username, setUsername] = useState()

  function handleScore(e) {
    e.preventDefault()
    console.log(id)
    axios
      .post(`http://localhost:3000/highscore/${id}`, {
        headers: { "Content-Type": "application/json" },
        username,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    console.log(ref)
    if (openModal) {
      ref.current.showModal()
      console.log(id)
      axios
        .get(`http://localhost:3000/highscore/${id}`)
        .then((response) => {
          console.log(response)
          setData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [openModal])

  return (
    <>
      {loading ? (
        <dialog ref={ref}>
          <p>WAIT</p>
        </dialog>
      ) : data.highscore == true ? (
        <dialog ref={ref}>
          <p>
            You found all the characters in {data.score} seconds and got a
            highscore! If you want to save your score on the leaderboards input
            your username.
          </p>
          <form
            onSubmit={(e) => handleScore(e)}
            method="POST"
            action="http://localhost:3000/highscore"
          >
            <label htmlFor="username">Name:</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
              type="text"
            />
            <button>Submit</button>
          </form>
        </dialog>
      ) : (
        <dialog>
          <p>
            You found all the characters in {data.score} seconds. You werent low
            enough for a highscore, try to be faster nex time!
          </p>
        </dialog>
      )}
    </>
  )
}

export default Popup
