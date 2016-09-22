var fs = require('fs')
var pa11y = require('pa11y')
var config = require('./accessibility-config')
var tester = pa11y(config)
var htmlReporter = require('pa11y/reporter/html')

const url = 'http://localhost:3000'
const outputDir = './test/wcag/html'
const outputFilename = 'aa-results.html'
const outputRelativePath = outputDir + '/' + outputFilename

tester.run(url, function (error, results) {
  if (!error) {
    var html = htmlReporter.process(results, url)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }

    fs.writeFile(outputRelativePath, html, function (error) {
      if (error) {
        return console.log(error)
      }
    })

    return console.log('WCAG Accessibility report completed')
  }
})
