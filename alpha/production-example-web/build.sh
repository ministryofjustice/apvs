#!/bin/bash

function delete_node_modules() {
  rm -rf node_modules
}

function install_modules() {
  npm install
}

function copy_assets() {
  rm -rf app/govuk_modules
  mkdir app/govuk_modules

  mkdir app/govuk_modules/govuk_template
  cp -r node_modules/govuk_template_jinja/assets/* app/govuk_modules/govuk_template

  mkdir app/govuk_modules/govuk_frontend_toolkit
  cp -r node_modules/govuk_frontend_toolkit/javascripts app/govuk_modules/govuk_frontend_toolkit/.
  cp -r node_modules/govuk_frontend_toolkit/images app/govuk_modules/govuk_frontend_toolkit/.
}

function copy_templates() {
  rm -f app/views/govuk_template.html
  cp node_modules/govuk_template_jinja/views/layouts/govuk_template.html app/views/
}

function compile_scss() {
  ./node_modules/node-sass/bin/node-sass --include-path="node_modules/govuk_frontend_toolkit/stylesheets" --include-path="node_modules/govuk-elements-sass/public/sass" "app/assets/sass/application.scss" "app/public/stylesheets/application.css"
}

main () {
  #delete_node_modules
  #install_modules
  copy_assets
  copy_templates
  compile_scss
}

main