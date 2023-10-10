const handleToggleWhenClickedOutside = (ref, isToggled, setToggle, extraRef ) => {

  // you do not understand this function fully

  // you do not understand how useRef works completely

  // for some reason it works for cart but not for user status

  // the last 2 conditions in the if statement are the ones responsible for making the function mor dynamic

  // you must understand how to set the conditions in such a way that all the toggles will work with this function

  const handleOutsideClick = (event) => {
      // console.log(event.target, ref.current)
      console.log("handleToggle works")
    if (
      isToggled &&
      ref.current &&
      !ref.current.contains(event.target) 
      // ||
      // isToggled &&
      && !extraRef.current 
      && extraRef?.current?.contains(event.target)
    ) {
      setToggle(false)
      console.log("Toggle disabled")
    } 
    // else {
    //   console.log("Toggle enabled")
    // }
  }

  console.log( "Is toggle active", isToggled)

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