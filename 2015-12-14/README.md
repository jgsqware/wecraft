# Context

Nginx - Node - Redis

# Networking

1. Create Key-Value store for Service Discover, Networks, IPs, ...
   ```bash
   > docker-machine create -d virtualbox keystore
   > docker $(docker-machine config keystore) run -d \
    -p "8500:8500" \
    -h "consul" \
    progrium/consul -server -bootstrap
   ```

2. Create a swarm master
   ```bash
   > docker-machine create \
        -d virtualbox \
        --swarm --swarm-master \
        --swarm-discovery="consul://<keystore-ip>:8500" \
        --engine-opt="cluster-store=consul://<keystore-ip>:8500" \
        --engine-opt="cluster-advertise=eth1:2376" \
        swarm-m
   ```

4. Create Swarm nodes
   ```bash
   > docker-machine create -d virtualbox \
    --swarm \
    --swarm-discovery="consul://<keystore-ip>:8500" \
    --engine-opt="cluster-store=consul://<keystore-ip>:8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
    swarm-0
   
   > docker-machine create -d virtualbox \
    --swarm \
    --swarm-discovery="consul://<keystore-ip>:8500" \
    --engine-opt="cluster-store=consul://<keystore-ip>:8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
    swarm-1
   
   > docker-machine create -d virtualbox \
    --swarm \
    --swarm-discovery="consul://<keystore-ip>:8500" \
    --engine-opt="cluster-store=consul://<keystore-ip>:8500" \
    --engine-opt="cluster-advertise=eth1:2376" \
    swarm-2
   ```

5. Create network
   ```bash
   > eval $(docker-machine env --swarm swarm-m)
   > docker network create -d overlay my-awesome-network
   ```

6. Show network on nodes
   ```bash
   > eval $(docker-machine env swarm-0)
   > docker network ls
   ```
7. Back on swarm master
   ```bash
   > eval $(docker-machine env --swarm swarm-m)
   ``` 
8. Create Redis Database on node 0
   ```bash
   > docker run -d --name=db --net=my-awesome-network --env="constraint:node==swarm-0" -p 6379:6379 redis
   ```
9. Create Node Application on node 1
   ```bash
   > docker run -d --name=app --net=my-awesome-network --env="constraint:node==swarm-1" -p 8080:8080 jgsqware/node-sample:wecraft-15-12-14
   ```
10. Create Nginx Web Server on node 2
   ```bash
   > docker run -d --name=web --net=my-awesome-network --env="constraint:node==swarm-2" -p 80:80 jgsqware/nginx-sample:wecraft-15-12-14
   ```

      

