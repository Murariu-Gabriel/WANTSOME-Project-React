## FETCHING

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