const getAlphanumericPoints = (str) => {
  // One point for every alphanumeric character in the retailer name.
  let count = 0
  for (const char of str) {
    if (char.match(/[a-zA-Z0-9]/)) {
      count++
    }
  }
  return count
}

const getTotalPoints = (total) => {
  /* 50 points if the total is a round dollar amount with no cents.
    25 points if the total is a multiple of 0.25. */

  const points = (total % 1 === 0 ? 50 : 0) + (total % 0.25 === 0 ? 25 : 0)
  return points
}

const getDatePoints = (purchaseDateString) => {
  // 6 points if the day in the purchase date is odd.
  const day = new Date(purchaseDateString).getDate()
  return day % 2 !== 0 ? 0 : 6
}

const getTimePoints = (purchaseTimeString) => {
  // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  const [hours, minutes] = purchaseTimeString.split(':').map(Number)

  const totalMinutes = hours * 60 + minutes
  return totalMinutes > 14 * 60 && totalMinutes < 16 * 60 ? 10 : 0
}

const getItemsPoints = (items) => {
  /* 5 points for every two items on the receipt.
If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. */
  let totalPoints = 0

  items.forEach((item) => {
    let trimmedDescription = item.shortDescription.trim()
    let descriptionLength = trimmedDescription.length

    if (descriptionLength % 3 === 0) {
      let price = parseFloat(item.price)
      let pointsForItem = Math.ceil(price * 0.2)
      totalPoints += pointsForItem
    }
  })

  const multiplesOfTwo = Math.floor(items.length / 2)

  totalPoints += multiplesOfTwo * 5

  return totalPoints
}

const calculateReceiptPoints = (receipt) => {
  let points = 0

  const alphanumericPoints = getAlphanumericPoints(receipt.retailer)
  points += alphanumericPoints

  const totalPoints = getTotalPoints(receipt.total)
  points += totalPoints

  const datePoints = getDatePoints(receipt.purchaseDate)
  points += datePoints

  const timePoints = getTimePoints(receipt.purchaseTime)
  points += timePoints

  const itemsPoints = getItemsPoints(receipt.items)
  points += itemsPoints

  return points
}

module.exports = calculateReceiptPoints
