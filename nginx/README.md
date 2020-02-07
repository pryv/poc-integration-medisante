
# Install auto-renewable LetsEncrypt SSL cert on host NGINX


Reference: [https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/)

## Install cert

1. add service config

in `/etc/nginx/sites-available/${SERVICE_HOSTNAME}.conf`, add:

note: you must remove `default_server` if more than 1 service is running

```
upstream ${SERVICE_NAME} {
  server localhost:${SERVICE_PORT};
}

server {
    server_name ${SERVICE_HOSTNAME};
    
    listen 80;
    listen [::]:80;
    
    location / {
      proxy_pass http://${SERVICE_NAME}/;
    }
}
```

2. add link to it: `ln -s /etc/nginx/sites-available/${SERVICE_HOSTNAME}.conf /etc/nginx/sites-enabled/${SERVICE_HOSTNAME}.conf`

3. Verify: `nginx -t && nginx -s reload`

4. Generate cert: `sudo certbot --nginx -d SERVICE_HOSTNAME`

when prompted to redirect from HTTP to HTTPS, say yes

5. reboot NGINX `service nginx restart`

## Set auto-renewal

1. Open `crontab -e`

2. add line: `0 12 * * * /usr/bin/certbot renew --quiet`
