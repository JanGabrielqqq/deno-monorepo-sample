import "./App.css"
// @deno-types="@types/react"
import React, { useState } from "react"
import { requestFile } from "@scope/components"
import data from "./assets/data.json" with { type: "json" }

function App() {
  const [count, setCount] = useState(0)

  // for demonstration purposes check on chrome devtools Network > Img then click count button
  const image = count === 1 ? "./vite.svg" : "./react.svg"
  const imageDino = count === 2 ? "./vite-deno.svg" : ""
  return (
    <React.Fragment>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <img src={requestFile(imageDino)} alt="Vite with Deno" />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={requestFile(image)} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img
            src={requestFile(image)}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </React.Fragment>
  )
}

export default App
