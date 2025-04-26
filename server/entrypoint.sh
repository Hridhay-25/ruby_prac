#!/bin/bash
set -e

rm -f /server/tmp/pids/server.pid

echo "Running database migrations.."
bundle exec rails db:migrate

if [ -f /server/db/seeds.rb ]; then
  echo "Seeding databases..."
  bundle exec rails db:seed
fi

echo "Starting rails server ..."

exec "$@"
