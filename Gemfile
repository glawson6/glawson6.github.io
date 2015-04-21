source "http://rubygems.org"

gem 'jekyll', '~> 2.3.0'
gem 'kramdown'
gem 'compass', '~> 1.0.1'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
