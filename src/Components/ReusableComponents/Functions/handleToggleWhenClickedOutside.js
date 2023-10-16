const handleToggleWhenClickedOutside = (ref, isToggled, setToggle, extraRef = null) => {

  const handleOutsideClick = (event) => {

    if (!event.target.classList.contains("select")){
      document.body.classList.add("stop-scroll")
    }

   if (isToggled && ref.current) {
     if (
       !ref.current.contains(event.target) &&
       (!extraRef || (extraRef && !extraRef.current.contains(event.target)))
     ) {
      if (!isNaN(event.target.innerText) || event.target.tagName !== "BUTTON") {
        setToggle(false)
        document.removeEventListener("click", handleOutsideClick)
        document.removeEventListener("keydown", handleKeyPress)
        document.body.classList.remove("stop-scroll")
        
      } 
     }
   } else {

  
     document.removeEventListener("click", handleOutsideClick)
      document.removeEventListener("keydown", handleKeyPress)
     document.body.classList.remove("stop-scroll")
     console.log("fail")
   }
  }

  const handleKeyPress = (event) => {
    if(event.key === "Escape"){
        setToggle(false)
        document.removeEventListener("click", handleOutsideClick)
        document.removeEventListener("keydown", handleKeyPress)
        document.body.classList.remove("stop-scroll")
    }
  }


  

  if (isToggled) {
    document.addEventListener("click", handleOutsideClick)
    document.addEventListener("keydown", handleKeyPress)
   
  } else {
    document.removeEventListener("click", handleOutsideClick)
    document.removeEventListener("keydown", handleKeyPress)
  
  }

  return () => {
    document.removeEventListener("click", handleOutsideClick)
    document.removeEventListener("keydown", handleKeyPress)

  }
}

export default handleToggleWhenClickedOutside