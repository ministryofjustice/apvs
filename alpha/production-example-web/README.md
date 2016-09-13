# Production example web

This is an example node application which includes the [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit) but has been modified to be production ready. It is intended as an example and template for beta node applications.

## Features

### TODO

* GDS styles
* gzip
* logging
* error handling
* async processing
* use a process manager
* run in NODE_ENV `production`
* set caching headers
* set security headers

### DONE

* structured for containers
  * move all but package.json and node_modules into app folder, so when running container for development you can run using nodemon with volumes mapped to local folders and reload on changes with application files separated from dependencies. `npm install` can still be run by attaching to containers and executing manually

## Notes

* Using
  * Express (path of least resistance)
    * nunjunks templates
  * Grunt (required by toolkit)
  * PM2 process manager
  * Docker



## Installing GDS styles

This is important for consistency between services and to keep styles maintable inline with GDS updates.

* Added govuk_frontend_toolkit, govuk_template_jinja (using nunjucks templates)

## Links

* [Express production best practise](https://expressjs.com/en/advanced/best-practice-performance.html)
* [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit)