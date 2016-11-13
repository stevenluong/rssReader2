FROM ruby:2.2.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /apollo
WORKDIR /apollo
ADD Gemfile /apollo/Gemfile
ADD Gemfile.lock /apollo/Gemfile.lock
RUN bundle install
ADD . /apollo
