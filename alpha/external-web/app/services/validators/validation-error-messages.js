module.exports = {
  getIsRequired: function (displayName) { return `${displayName} is required` },
  getIsAlpha: function (displayName) { return `${displayName} must only contain letters` },
  getIsNumeric: function (displayName) { return `${displayName} must only contain numbers` },
  getIsAddress: function (displayName) { return `${displayName} must contain a number followed by the street name e.g. '10 Street Name'` }
}
