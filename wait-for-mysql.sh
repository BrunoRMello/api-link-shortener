#!/bin/bash
set -e

# Checa a conectividade com o MySQL
until mysql -h"$1" -P"$2" -u"$MYSQL_USERNAME" -p"$MYSQL_PASSWORD" -e 'SELECT 1'; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"

exec "$@"
