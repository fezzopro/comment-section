FROM ruby:3.2
RUN apt-get update -y  && \
  apt-get install -y nodejs postgresql-client

WORKDIR /backend
COPY . .
COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend/Gemfile.lock
RUN bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
COPY migrate.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/migrate.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]