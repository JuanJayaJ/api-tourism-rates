#!/usr/bin/env sh
set -e

# Wait until DB is ready
until nc -z "$DB_HOST" 5432; do
  echo "⏳ waiting for database at $DB_HOST:5432..."
  sleep 2
done

echo "✅ database is up, running migrations..."
npx prisma migrate deploy --schema=prisma/schema.prisma

echo "🚀 starting server..."
node dist/server.js
