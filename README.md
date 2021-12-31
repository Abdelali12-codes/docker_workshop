# Devops and aws workshop

## commands

### to check the ip address of the container

```
docker inspect --format '{{ .NetworkSettings.IPAddress }}' node_app
```

### build the nodejs app image

```
docker build -t nodejsimage .
```

### list containers

```
docker ps
```

### list stoped and run container

```
docker ps -a
```

### list images

```
docker images
```

### run the nodejs container

```
docker run --name nodejs --hostname nodejs -p 8000:8000 -d nodejsimage
```

### get inside the run container

```
docker exec -it name_container bash
```

### stop a container

```
docker stop name_of_container (nodejs)
```

### stop and remove run container

```
docker rm -f name_of_container (nodejs)
```

### remove image

```
docker rmi docker_image_name (nodejsimage)
```

### pull image from docker registry (Dockerhub)

```
docker pull name_of_image
```

## steps to push your local image to docker registry (Dockerhub)

- build the image

```
docker build -t nodejsimage .
```

- tag the image

```
docker tag nodejsimage name_of_your_dockerhub_account/nodejsimage
```

- login to your dockerhub account

```
docker login -u name_of_user -p
```

- push the image

```
docker push name_of_your_dockerhub_account/nodejsimage
```

## Docker volumes and network

- to allow two containers to communicate to each others we either use network or volume (shared volume)

### Docker network

#### we have three types of network

- host
- bridge
- none

- create network

```
docker network create name_of_network --driver bridge
```

## create two containers in the same network to communicate to each others

- create first container, we assume its name is container1 and use image1 and the same the second container (container2 , image2)

```
docker run --name container1 ---host container1 -p xxxx:xxxx -d --network name_of_network image1
```

- create second container

```
docker run --name container2 ---host container1 -p xxxx:xxxx -d --network name_of_network image2
```

## implementation of the network communication for our exampple

- first step, we stop the run container of nodejs app we created earlier, using below command:

```
docker rm -f nodejs
```

- second step is to build an image for our second container. git in the web folder in the project and run the below command:

```
docker build -t webappimage .
```

- list the images, you have to see three images
- third step, run the nodejs app container (be sure to run this container at the first), using below commands

```
docker run --name node_app --hostname nodeapp -p 8000:8000 -d --network name_of_network nodejsimage
```

- forth step, run the webapp container, using below commands:

```
docker run --name webapp --hostname webapp -p 80:80 -d --network name_of_network webappimage
```

- now go to your browser from the host your are running the container and type

```
localhost <=> 127.0.0.1
```

- or

```
ip_address_of_the_host_you_are_running_docker_from
```

- to see the second app, add this to the previous url you insert in the browser

```
localhost/nodeapp
```

- or

```
ip_address_of_the_host_you_are_running_docker_from/nodeapp
```

## types of volumes on docker (bind mount, volumes)

### 
