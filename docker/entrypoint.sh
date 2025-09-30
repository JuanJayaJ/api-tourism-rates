#!/usr/bin/env sh
set -e

# Wait for Postgres (simple retry)
until node -e "require('dns').lookup(process.env.DB_HOST || 'db', e => process.exit(e ? 1 : 0))"; do
  echo "⏳ waiting for database..."
  sleep 1
done

# Apply migrations (safe in prod too)
npx prisma migrate deploy --schema=prisma/schema.prisma

echo "✅ migrations applied, starting app..."
node dist/server.js
