

export const lengthValidation = (fieldValue, length) => {
    const value = fieldValue.toString().length
  return value >= length && value <= length || `Field should have ${length} characters`
}

export const namesValidation = (name) => {
  const regex = /[\!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/
  const test = regex.test(name)
  return !test || "Wrong format"
}