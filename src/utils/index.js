/**
 * zeroFill
 * @param {string|number} num
 */
export const zeroFill = (num) => {
  return +num >= 10 ? num : '0' + num
}

export const dateFormat = (time) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = zeroFill(date.getMonth() + 1)
  const day = zeroFill(date.getDate())
  // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // return `${months[month]} ${prefixZero(day)}, ${year}`
  return `${year}-${month}-${day}`
}
