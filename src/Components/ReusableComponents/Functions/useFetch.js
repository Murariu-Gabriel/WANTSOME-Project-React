import { useEffect, useState } from "react"



const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(url)
 
        if (!resp.ok) {
          setIsError(true)
          setIsLoading(false)
          return
        }

        const response = await resp.json()
        setData(response)
       
      } catch (error) {
        setIsError(true)
        console.log(error)
      }

      setIsLoading(false)
    }
    fetchData()
  }, [])

  
  return { data, isLoading, isError }
}

export default useFetch
