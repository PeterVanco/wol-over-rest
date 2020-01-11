# wol-over-rest

**Use case:**

When running `Home assistant` (or other service) in Docker without `--net=host`, wake-on-lan service does not work out of the box. If you do not want to expose the service to host network, this container is here to help. It behaves as simple HTTP proxy of WOL requests to host network while keeping a very basic static-token based security for the endpoint.

**Run container (no token auth):**
```
  docker run -d --name wol-over-rest --net=host petervanco/wol-over-rest
```

**Run container (token auth):**
```
  docker run -d --name wol-over-rest --net=host -e TOKEN=123xyz456abc petervanco/wol-over-rest
```

**As part of Docker compose (token auth):**
```
  wol-over-rest:
    container_name: wol-over-rest
    image: petervanco/wol-over-rest:latest
    network_mode: host
    environment:
      PORT: 8124
      TOKEN: 123xyz456abc
      DEBUG: "true"
```

**Supported environment variables:**
* `PORT` (optional, default 3000) - target MAC address in format: `11:11:11:11:11:11`
* `TOKEN` (optional, default null) - authorization token used during container startup. If the token in request does not match the configured one, response code is 403
* `DEBUG` (optional, default false) - prints the configuration values during startup

**Endpoint:**
```
host:port/wake/{mac}?token={token}
```
* `{mac}` - target MAC address in format: `11:11:11:11:11:11`
* `{token}` (optional) - authorization token used during container startup. If the token in request does not match the configured one, response code is 403

