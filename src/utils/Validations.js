export const minMaxLength = (text, minLength, maxLength) => {
  let result = !text || text.length < minLength
  if (maxLength) result = result || text.length < minLength
  return result
}
export const validEmail = (text) => {
  const regex = RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  )
  return !regex.test(text)
}

export const currencyValue = (value) => {
  return value === 0
    ? null
    : value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
}

export const findObject = (obj, value) => {
  const findBooleans = value.map((value) => {
    return obj.hasOwnProperty(value)
  })
  return findBooleans.includes(true) ? true : false
}

export const findEmptyValues = (obj, value) => {
  const findBooleans = value.map((value) => {
    return obj[value] ? true : false
  })
  return findBooleans.includes(false) ? true : false
}

export const filterOptions = (options, value) => {
  return options.filter(
    (item) => item.toLowerCase().indexOf(value.toLowerCase()) > -1
  )
}
export const findInArray = (options, value) => {
  return options.filter((item) => {
    return item.toLowerCase() === value.toLowerCase()
  })
}
export const numericOnly = (value) => {
  return value ? value.replace(/\D/g, '') : ''
}
export const lettersOnly = (value) => {
  return value ? value.replace(/[^a-z S]+/i, '') : ''
}
export const phoneValue = (value) => {
  var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
  return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
}
