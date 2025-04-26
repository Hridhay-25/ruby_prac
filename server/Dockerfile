FROM ruby:3.2.0

RUN apt-get update -qq && apt-get install -y postgresql-client

RUN bundle config --global frozen 1

WORKDIR /server

COPY Gemfile /server/Gemfile
COPY Gemfile.lock /server/Gemfile.lock
RUN bundle install

COPY . /server

COPY entrypoint.sh /usr/bin
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails","server","-b","0.0.0.0"]
