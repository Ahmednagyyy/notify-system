package com.notify.notificationservice.service;

import com.notify.notificationservice.broker.KafkaService;
import com.notify.notificationservice.model.Notification;
import com.notify.notificationservice.model.NotificationGatewayResponse;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Date;

@Service
@Slf4j
public class ServiceNotification {

    private KafkaService kafkaService;

    public ServiceNotification(KafkaService kafkaService) {
        this.kafkaService = kafkaService;
    }

    /**
     * @param notification Receive the group notification and update the notification type before publishing it by kafka
     */
    public ResponseEntity<NotificationGatewayResponse> sendGroupNotification(Notification notification) {
        NotificationGatewayResponse response = new NotificationGatewayResponse();
        return Mono.fromCallable(() -> notification)
                .map(validation -> {
                    if (notification == null) {
                        response.getErrors().add("Notification body should not be null");
                        response.setMessage("Notification sending failed");
                        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                    } else {
                        NotificationGatewayResponse res =
                                checkNotificationData(notification, response);
                        response.getErrors().addAll(res.getErrors());
                        if (notification.getGroupId() == null ||
                                notification.getGroupId().isEmpty()) {
                            response.getErrors().add("Notification groupId should not be null");
                            response.setMessage("Notification sending failed");
                            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                        }
                        notification.setCreatedAt(new Date());
                        notification.setAudienceType(Notification.AudienceType.GROUP);
                        return getNotificationGatewayResponse(notification, response);
                    }
                }).block();

    }

    /**
     * @param notification Receive the single notification and update the notification type before publishing it by kafka
     */
    public ResponseEntity<NotificationGatewayResponse> sendSingleNotification(Notification notification) {
        NotificationGatewayResponse response = new NotificationGatewayResponse();
        return Mono.fromCallable(() -> notification)
                .map(validation -> {
                    if (notification == null) {
                        response.getErrors().add("Notification body should not be null");
                        response.setMessage("Notification sending failed");
                        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                    } else {
                        NotificationGatewayResponse res =
                                checkNotificationData(notification, response);
                        response.getErrors().addAll(res.getErrors());
                        if (notification.getUserId() == null ||
                                notification.getUserId().isEmpty()) {
                            response.getErrors().add("Notification userId should not be null");
                            response.setMessage("Notification sending failed");
                            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
                        }
                        notification.setCreatedAt(new Date());
                        notification.setAudienceType(Notification.AudienceType.SINGLE);
                        return getNotificationGatewayResponse(notification, response);
                    }
                }).block();

    }

    @NotNull
    private ResponseEntity<NotificationGatewayResponse> getNotificationGatewayResponse(
            Notification notification,
            NotificationGatewayResponse response)
    {
        if (!response.getErrors().isEmpty()) {
            response.setMessage("Notification sending failed");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } else {
            kafkaService.publishNotification(notification);
            response.setMessage("Notification sent successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    private NotificationGatewayResponse checkNotificationData(
            Notification notification,
            NotificationGatewayResponse response
    ) {
        if (notification.getNotificationType() == null ||
                notification.getNotificationType().name().isEmpty()) {
            response.getErrors().add("Notification type should not be null");
            response.setMessage("Notification sending failed");
        }
        if (notification.getTitle() == null ||
                notification.getTitle().isEmpty()) {
            response.getErrors().add("Notification title should not be null");
            response.setMessage("Notification sending failed");
        }

        if (notification.getBody() == null ||
                notification.getBody().isEmpty()) {
            response.getErrors().add("Notification body should not be null");
            response.setMessage("Notification sending failed");
        }
        return response;
    }

}