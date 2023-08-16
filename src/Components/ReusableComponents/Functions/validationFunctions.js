

export const emptyValidation = (fieldValue) => {
  
  return fieldValue.length !== 0 || `Field is required`
}

export const namesValidation = (name) => {
  const regex = /[\!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
  const test = regex.test(name)
  return !test || "Wrong format"
}