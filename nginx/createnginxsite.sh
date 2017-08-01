#!/usr/bin/env bash


set -e
set -u

DOMAIN=$1
PORT=$2

echo "DOMAIN: ${DOMAIN}"
echo "PORT: $PORT"

# Copy nginx VHOST template
#cp -v /etc/nginx/sites-available/__template__without_php__ /etc/nginx/sites-available/${DOMAIN}
rm -v ./__template__ /etc/nginx/sites-available/${DOMAIN}
rm -v ./__template__ /etc/nginx/sites-enabled/${DOMAIN}


cp -v ./__template__ /etc/nginx/sites-available/${DOMAIN}

# Replace DOMAIN name in nginx template
sed -i "s/__DOMAIN__/${DOMAIN}/g" /etc/nginx/sites-available/${DOMAIN}
sed -i "s/__PORT__/${PORT}/g" /etc/nginx/sites-available/${DOMAIN}


ln -s /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}
/etc/init.d/nginx reload
