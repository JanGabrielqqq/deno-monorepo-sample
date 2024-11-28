import React from "react"

const DinoNuggys = (): JSX.Element => {
  return (
    <React.Fragment>
      <p>{import.meta.env.VITE_APP_TEST_ENV}</p>
      <img src="/vite-deno.svg" alt="Vite with Deno" />
    </React.Fragment>
  )
}

export default DinoNuggys
