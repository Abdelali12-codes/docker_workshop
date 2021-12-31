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

## Docker network

### we have three types of network

- host
- bridge
- none

## implementation of docker network

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

## volumes

- create volume

```
docker volume create name_of_volume
```

- list volume

```
docker volume ls
```

- remove volume

```
docker volume rm name_of_volume
```

## implementation of volumes

- in this example we will work with nginx (webserver) image to show you that example

- pull the image from docker hub

```
docker pull nginx
```

- stop all previous run containers

```
docker rm -f node_app webapp
```

- run first container from the nginx image

```

docker run --name container1 --hostname container1 -p 80:80 -d -v name_of_volume:/usr/share/nginx/html nginx

```

- run the second container from the nginx image

```
docker run --name container2 --hostname container2 -p 8000:80 -d -v name_of_volume:/usr/share/nginx/html nginx
```

- try to open two tabs on your browser and browse the two containers using below

```
localhost <=> 127.0.0.1
```

- and

```
localhost:8000 <=> 127.0.0.1:8000
```

- now try to connect to one of the containers, you have just created (container1, container2) using the command below:

```
docker exec -it container1 bash
```

- an interactive terminal well be opened within your container that enable you to run commands on your run contianer

* switch the path to /usr/share/nginx/html using the below

```
cd /usr/share/nginx/html
```

- list the content of the folder

```
ls
```

- update the packages inside the container

```
apt update

```

- install the nano editor to edit the index.html file

```
apt install nano
```

- edit the index.html file using the below command

```
nano index.html
```

- the editor will be opened delete or add some lines and follow the steps below

```
on your keyboard click on  Ctrl+x then y
```

- back to your browser and refresh the tabs, and you will discover that the file changes on the two containers even we changed it only on one container

### bind mounts

- first step create index.html somewhere on your laptop and edit it by paste this lines to it and save the changes

```
<html>
<body>
<h1> Hello world </h1>
<h2> this is an example for the bind mounts </h2>
</body>
</html>
```

- second step, run the below command:

* if you are on linux run the below command:

```
docker run --name container3 --hostname container3 -d -p 9000:80 $HOME/path/to/file:/usr/share/nginx/html nginx
```

- if you are on windows using docker desktop

```
docker run --name container3 --hostname container3 -d -p 9000:80 c:\\path\to\file:/usr/share/nginx/html nginx
```
