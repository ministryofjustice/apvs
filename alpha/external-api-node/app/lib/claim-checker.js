exports.checkForAutomaticProcessing = function (claim) {
  if (claim && claim.hasOwnProperty('amount')) {
    if (claim.amount < 100) {
      return { 'processing-type': 'automatic', 'messages': null }
    } else {
      return { 'processing-type': 'manual', 'messages': ['Exceeded automatic processing threshold'] }
    }
  } else {
    return null
  }
}
