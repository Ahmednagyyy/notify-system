# notify-system
Notify system is a simple solution designed for sending Push-notifications and SMS

--------

# Solution: 
![alt text](https://github.com/Ahmednagyyy/notify-system/blob/main/resources/notify-system-diagram.png "ALE Solution")
1. This application built using microservice architecture
2. Apache Kafka for service communication
3. Postgres as datastore  
4. All services are containarized using Docker-compose


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
1. When App first run sequelize (ORM) seeds Users, Devices, Groups, and its releations to the database
2. Notification service receivies notification request and validate it, then send it to User Service over Kafka
3. User service receivies Kafka message and starts to handle the message based on its type
* If it is single sms message, it gets user by id and get all of his devices mobile numbers to send the sms
* If it is a group sms message, it gets all users related to this group and get each user devices and its numbers to send the sms
* If it is single push notification, it gets user by id and get all of his devices tokens to send the push notification
* If it is a group push notification, it gets all users related to this group and get each user devices and its devices tokens to send the sms
4. Send notification back with user details to Notification service
5. Notification service send SMS/push notifications to users, and Handle rate limit in case of SMS messages


# How to run:
1. Please add .env file copy it from .env.copy inside users-service
2. For the first time please run the docker images of all services with `docker-compose up --build` then run with `docker-compose up`
3. Clean docker compose by `docker-compose down -v --rmi all --remove-orphans`


# Project structure:
```
- notification-service
- users-service
- resources folder
- docker-compose
```

# Logs: 
1. Logs will be visible after runing `docker-compose up` however for each service logs please run this command `docker logs -f <container_name>`
2. Examples
* Notification-service kafka publishing :
```
notifications-service-server | 2021-07-01 10:24:00.117  INFO 1 --- [nio-8080-exec-3] c.n.n.broker.KafkaService                : Publish Single Notification
notifications-service-server |  Notification content: {"title":"Discount!","body":"Use Promo code 'D75' for 75% discount","createdAt":"2021-07-01T10:24:00","userId":"1","audienceType":"SINGLE","notificationType":"PUSH_NOTIFICATION"}
notifications-service-server |  on Topic name: single_notification_topic
```
* Notification-service Kafka receiving
```
notifications-service-server | 2021-07-01 10:24:00.212  INFO 1 --- [ntainer#2-0-C-1] c.n.n.broker.KafkaService                : SMS sent -> {"body":"Hi Ahmed Mohamed, Use Promo code 'D75' for 75% discount","title":"Discount!","token":"xxxxxx-xxxxxx-xxxxxx-xxxxxx1"}
```
* Users-service Kafka receiving
```
SINGLE Push Notification Received
users-service-server    | Message: {"audienceType":"SINGLE","body":"Use Promo code 'D75' for 75% discount","title":"Discount!","userId":"1","createdAt":"2021-07-01T10:24:00","notificationType":"PUSH_NOTIFICATION"}
```
* Users-service kafka publishing :
```
users-service-server    | Sending Push Notification:
users-service-server    | {"body":"Hi Ahmed Mohamed, Use Promo code 'D75' for 75% discount","title":"Discount!","token":"xxxxxx-xxxxxx-xxxxxx-xxxxxx1"}
users-service-server    | Sent Successfully
```


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


