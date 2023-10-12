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
       setToggle(false)
       document.removeEventListener("click", handleOutsideClick)
       document.body.classList.remove("stop-scroll")
     }
   } else {
     document.removeEventListener("click", handleOutsideClick)
     document.body.classList.remove("stop-scroll")
   }
  }

  

  if (isToggled) {
    document.addEventListener("click", handleOutsideClick)
   
  } else {
    document.removeEventListener("click", handleOutsideClick)
  
  }

  return () => {
    document.removeEventListener("click", handleOutsideClick)
  }
}

export default handleToggleWhenClickedOutside