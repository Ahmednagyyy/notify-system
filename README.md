# notify-system
Notify system is a simple solution designed for sending Push-notifications and SMS

--------

# Solution: 
![alt text](https://github.com/Ahmednagyyy/notify-system/blob/main/resources/notify-system-diagram.png "ALE Solution")
1. This application build using microservice architecture
2. Apache Kafka for service communication
3. Postgres as datastore  


# Services:
1. Notification Service ( Spring boot - Java )
* Receiving Single/Group notifications requests and validate it
* Publish it over KAFKA topic
* Receiving final form of notification and send it users ( Should be sent over FCM and any SMS service provider ) it onlt logs a simulation of sending notifications
* SMS has a rate limit 20 sms per minute, for more enhancements this part should have retry mechanisme and data store to prevent losing data.
2. Users Service ( ExpressJs - Node )
* This service is for users managment or an IDM, containg user data ( User info and settings, user devices, and user groups )
* Each user could have more than 1 device and each device have different mobile number and FCM token, and also user has settings for enable/disable notifications
* Each user could have more than 1 group
* Receiving Single/Group messages over KAFKA
* Send SMS/Push notification after getting user mandatory data back to the Notification Service


# Flow:
1. Notification service receivies notification request and validate it, then send it to User Service over Kafka
2. User service receivies Kafka message and starts to handle the message based on its type
* If it is single sms message, it gets user by id and get all of his devices mobile numbers to send the sms
* If it is a group sms message, it gets all users related to this group and get each user devices and its numbers to send the sms
* If it is single push notification, it gets user by id and get all of his devices tokens to send the push notification
* If it is a group push notification, it gets all users related to this group and get each user devices and its devices tokens to send the sms
3. Send notification back with user details to Notification service
4. Notification service send SMS/push notifications to users, and Handle rate limit in case of SMS messages


# How to run:
1. For the first time please run the docker images of all services with `docker-compose up --build` then run with `docker-compose up`
2. Clean docker compose by `docker-compose down -v --rmi all --remove-orphans`


# Logs: 
1- Logs will be visible after runing `docker-compose up` however for each service logs please run this command `docker logs -f <container_name>`

# Notes: 
1. I've built and pushed Java service over Docker hub because of mvn dependancies, so I provide it as an Image in the docker compose
2. I didn't do the same thing to the node app because of the node modules is very large and it is better to build it on the run time


# API:
1. Two main endpoints [Postman Collection](https://github.com/Ahmednagyyy/notify-system/blob/main/resources/Notify-system-api.postman_collection.json) 
* /api/notification/group
* /api/notification/single
2. Swagger UI : Run the app and open -> http://localhost:8080/swagger-ui.html#/notifications-controller
3. Or you can use openapi/swagger files 
* [Open Api](https://github.com/Ahmednagyyy/notify-system/blob/main/resources/openapi3.json)
* [Swagger](https://github.com/Ahmednagyyy/notify-system/blob/main/resources/swagger.yml)


