#!/bin/sh
set -e

echo "⏳ Waiting for database at $DATABASE_URL..."
until nc -z db 5432; do
  echo "⏳ waiting for database at db:5432..."
  sleep 2
done
echo "✅ Database is up!"

echo "📦 Running migrations..."
npx prisma migrate deploy

echo "🚀 Starting server..."
exec node dist/server.js
