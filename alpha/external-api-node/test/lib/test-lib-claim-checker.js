/* global describe it */
var expect = require('chai').expect
var claimChecker = require('../../app/lib/claim-checker')

describe('claim-checker', function () {
  describe('checkForAutomaticProcessing', function () {
    it('should return automatic if amount < 100', function () {
      var result = claimChecker.checkForAutomaticProcessing({amount: 99.9})
      expect(result['processing-type']).to.equal('automatic')
    })
    it('should return manual if amount >= 100', function () {
      var result = claimChecker.checkForAutomaticProcessing({amount: 100})
      expect(result['processing-type']).to.equal('manual')
    })
    it('should return null for invalid claim', function () {
      var result = claimChecker.checkForAutomaticProcessing({sausages: 100})
      expect(result).to.be.null
    })
  })
})
