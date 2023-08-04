# NOTE

- This project does not contain many libraries because I want to learn by doing most of the work myself. I am aware that libraries are a must and will make everything faster, efficient, are industry standard but I am still learning to code and I think it will help me. I plan to also add library solutions to this project after I finish it so I can compare the result.

## FETCHING

- Here we have 2 solutions for fetching
### .Then().Catch()

```JS
useEffect(() => {
    const firstResponse = (response) => {
     if (response.ok && response.status === 200) {
       return response.json()
     }

     return Promise.reject("ERROR")
   }

   const error = (error) => {
     console.log(error)
   }

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(firstResponse)
      .then((data) => setProduct(data))
      .catch(error)

      
  }, [])
```

### Async Await

```JS
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products")
        const fetchedProduct = await response.json()
        setProduct(fetchedProduct)

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
```

### useFetch custom hook

- Here we have a custom hook that returns isLoading, isError and data

- In this hook we have an async function that fetches our data and if the response has ok status of true will update the useState hooks accordingly

- we can use the returned values to render the data fetched or a message in case our fetch has failed

```JS
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
```