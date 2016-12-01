# Load Testing

This sample illustrates use of the peformance testing modules:

- [BrowserPerf](https://github.com/axemclion/browser-perf)
- [Artillery](https://artillery.io)

## Usage

BrowserPerf is configured to use the existing Selenium E2E tests developed for the Beta External web application.

You will need to set the SauceLabs environment variables before running the script as follows:

`npm start`

Artillery uses the `external.yaml` configuration to run a sample load test against several pages from the Alpha external web app, so you should have this running locally on your own machine at `http://localhost:3000`

Launch the test using:

`npm run-script test-artillery`

The script will run for the configured duration and will output a `artillery_report_.*.json` file in the working directory

You can view the HTML report for this output by running:

`artillery report <artillery_report.*.json>`

