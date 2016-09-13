# Production example web

This is an example node application which includes the [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit) but has been modified to be production ready. It is intended as an example and template for beta node applications.

## Features

### TODO

* use a process manager
* run in NODE_ENV `production`

### DONE

* structured for containers - move all but package.json and node_modules into app folder, so when running container for development you can run using nodemon with volumes mapped to local folders and reload on changes with application files separated from dependencies. `npm install` can still be run by attaching to containers and executing manually
* GDS styles - added npm modules for GOV.UK styles, build script and documented in ODP
* security headers - added [helmet](https://www.npmjs.com/package/helmet)
* gzip - added [compression](https://www.npmjs.com/package/compression)
* logger - added basic bunyan logger

## Notes

* Using
  * Express (path of least resistance)
    * nunjunks templates
  * Shell script to build
  * PM2 process manager
  * Docker
  * [helmet](https://www.npmjs.com/package/helmet) for security headers



## Installing GDS styles

This is important for consistency between services and to keep styles maintable inline with GDS updates.

* Added govuk_frontend_toolkit, govuk_template_jinja (using nunjucks templates) and govuk_elements

## Links

* [Express production best practise](https://expressjs.com/en/advanced/best-practice-performance.html)
* [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit)