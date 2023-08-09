# **MariaDB-Editor**

## **Introduction**
I wanted to build an SQL editor to increase my understanding of relational databases in fullstack development; the end result could be useful as a starting template for building a website with the backend hosted with Docker.

## **Description**
The project includes an SPA React + TypeScript frontend client where you can view and edit SQL data from MariaDB, as well as query the database directly. Additionally, a Node.js backend was developed to integrate with Docker. By working on this project I've gained valuable experience in building full-stack applications with relational data, it's also been a lot of fun.

## **How to run locally**

1.	Clone the project
```
git clone https://github.com/jfMoller/MariaDB-Editor.git
```

2.	Install local dependencies in the project directory
```
cd client
    npm i

cd server
    npm i
```
3.	Run the project
```bash
cd server
    npm run dev
```
## **How to do I get started with Docker & MariaDB?**
### 1. Download Docker desktop:
https://docs.docker.com/get-docker/

### 2.Pull the official MariaDB image:
Open a terminal (Command Prompt on Windows or Terminal on macOS) and run the following command:
```bash
docker pull mariadb
```
### 3.Run the MariaDB Container: 
Once you have the MariaDB image, you can create and run a container using the docker run command. For example:
```bash
docker run -d --name my_mariadb -e MYSQL_ROOT_PASSWORD=my_password -p 3306:3306 mariadb
```
* Replace "my_mariadb" with your preferred container name.
* Replace "my_password" with your desired root password.

### 4. Verify the Running Container: 
To check if the MariaDB container is running, use the following command:
```bash
docker ps
```
### 5. Download DataGrip (or an equivalent database IDE)
https://www.jetbrains.com/datagrip/download/#section=windows

### 6. Create a new data source (DataGrip)
Open DataGrip and create a new data source, select "MariaDB". Enter your root password from step 3 to access the container.

### 7. Create a database in your container
Create a new database, copy an old one, or use an example (see db-examples.md).

### 8. Connecting through MariaDB-Editor
Once your Docker container is up and running, and you've created a new database, you can connect to said database by entering the host, user, password and database name.
