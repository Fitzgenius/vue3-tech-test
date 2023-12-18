export const serialize = obj => {
  var str = []
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    }
  }
  return str.join("&")
}

export const formatCurrency = price => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(price)
}