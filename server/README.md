[![Build Status](http://ec2-54-152-64-250.compute-1.amazonaws.com:8080/buildStatus/icon?job=testserver)](http://ec2-54-152-64-250.compute-1.amazonaws.com:8080/job/testserver)

## Server Setup

1. Install latest version of node, npm and yarn
2. Do yarn install
3. create a db and change db settings in config.js
4. Run the migrations using the following command
```
npm run-script migrate
```
5. start server using the following command
```
DEBUG=homeautomation:* npm start
```
