# yml のビルド

[doc - redocly/cli](https://hub.docker.com/r/redocly/cli)

- Pull Docker Image

```
docker pull redocly/cli
```

- Lint yml

```
docker run --rm -v ${PWD}:/spec redocly/cli lint root.yml
```

- Build yml

```
docker run --rm -v ${PWD}:/spec redocly/cli build-docs root.yml --output=docs/openapi.html
```

- Merge yml

```
docker run --rm -v ${PWD}:/spec redocly/cli bundle root.yml --output=docs/openapi.yml
```

## yml をサーバーで起動する

[doc - redocly/redoc](https://hub.docker.com/r/redocly/redoc/)

- Pull Docker Image

```
docker pull redocly/redoc
```

- Publish yml and start web server

```
docker run -it --rm -p 80:80 -v \ ${PWD}/docs/openapi.yml:/usr/share/nginx/html/swagger.yaml \
-e SPEC_URL=swagger.yaml redocly/redoc
```

## モックサーバーを立てる

[doc - stoplight/prism](https://hub.docker.com/r/stoplight/prism)

- Pull Docker Image

```
docker pull stoplight/prism
```

- Start mock server

```
docker run --rm -it -p 4010:4010 -v ${PWD}/docs:/tmp stoplight/prism mock -h 0.0.0.0 /tmp/openapi.yml
```
