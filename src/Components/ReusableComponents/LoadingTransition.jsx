import { useState } from "react"

const LoadingTransition = () => {
  const [isLoadingLong, setIsLoadingTooLong] = useState(false)

  setTimeout(() => {
    setIsLoadingTooLong(true)
  }, 2000)

  if(!isLoadingLong){

    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className="loading">
        <h2>
          Loading..., The server is spinning back up, it takes a minute or two for the hosted server to start
        </h2>
    </div>
  )
}
export default LoadingTransition