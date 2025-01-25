# E-commerce Music

### Technologies:
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-000?style=for-the-badge&logo=sass)

### Group:
- Jose Henrique Pinto Joanoni
- Sofia Fedane
- Christopher Healy

## Installation Guide

After clone the project, open your terminal / cmd:
> cd server 

> npm install

Open another tab of your terminal / cmd:
> cd client

> npm install JWT_PRIVATE_KEY

Wait the installation to finnish, this will create your `node_modules` folder.

## Create your .pem file
- Go to [this link](https://slproweb.com/products/Win32OpenSSL.html) and download the most recent version of OpenSSL and
install it on your pc.
- Assuming  OpenSSL has been installed in the folder `C:\OpenSSL`, we need to run the following commands
> - cd C:/OpenSSL/bin
>
> - ./OpenSSL genrsa -des3 -out C:\OpenSSL\jwt_private_key.pem 2048
- Move your generated key to under the `server/config` folder of the project
- On your .env file update the constant `JWT_PRIVATE_KEY` to `JWT_PRIVATE_KEY = './config/jwt_private_key.pem'`


## Running The Project

On your tabs previously opened in `server` and `client` folders type:

### server folder
>nodemon

### client folder
>npm start

This will start both your server and client compilers, your webpage should pop up automatically.