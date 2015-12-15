# User Name Space demo
Purpose demonstrate that files owned by root on the host can't be modified anymore by the (pseudo) root user in the container.
The demontration is done by mapping the host/etc directory as container/data directory and modifying (or trying to modify) the hosts file.

## Demo setup
* move to work directory `/Users/jmm/work/usrnamespace_demo` and start Vagrant with `vagrant up` 
* install the experimental package with `curl -sSL https://experimental.docker.com/ | sh`

## Demo 
### First part
* if the virtual machine is already running do a `vagrant resload`
* verify that docker is running with `docker ps` 
* start an interactive container with `docker run -ti -v /etc:/demo centos:latest /bin/bash` 
* cd to the `/demo`  and show that this directory is the host's `/etc` directory. Notice the ownership of the files.
* launch `vi hosts` and add a comment line with `Kill Roy was here" => the file can be saved
* exit the container


### Second part
* stop the docker service with `service docker stop`
* in the other window (connected to the vagrant box), start the Docker Daemon with `sudo docker daemon --userns-remap=default`
* start the container again with `docker run -ti -v /etc:/demo centos:latest /bin/bash`
* cd to the `/demo` directory and show the file owners
* edit the file hosts file and it will fail