# NodeJS, ExpressJS & Simple Template Engine
NodeJS, ExpressJS, HTML5, CSS3, jQuery, JavaScript

# Clone Repository
```
git clone https://github.com/macanfa/docker-node-webapp.git
cd docker-node-webapp
```

# Building your image
```docker build -t <your username>/node-webapp .```
## Your image will now be listed by Docker:

```
$ docker images ls

REPOSITORY			TAG        ID              CREATED
node 				boron      539c0211cd76    3 weeks ago
your username/node-webapp 	latest     d64d3505b0d2    1 minute ago
```
# Run the image
```docker run -p 8080:8080 -d <your username>/node-webapp```

# Print the output of your app:
## Get container ID
```$ docker ps```
## Print app output
```
$ docker logs <container id>

Loading Module => info
Loading Module => api
INFO: 2017-01-26T11:17:08.746Z : Listening on port 8080
````
# Enter the container
```$ docker exec -it <container id> /bin/bash```

# Export docker Container
	docker export [containerID] > container-name.tar
# Save docker Image
	docker save 'user/image-name' > image-name.tar

# Import / Load to docker
	docker load image-name.tar
	docker import container-name.tar
