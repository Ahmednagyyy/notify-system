package com.notify.notificationservice.controller;

import com.notify.notificationservice.model.Notification;
import com.notify.notificationservice.model.NotificationResponse;
import com.notify.notificationservice.service.ServiceNotification;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/notification")
public class NotificationsController {
    private final ServiceNotification serviceNotification;



    public NotificationsController(ServiceNotification serviceNotification) {
        this.serviceNotification = serviceNotification;
    }

    @PostMapping(value = "/group", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NotificationResponse> sendGroupNotification
            (@RequestBody Notification notification) {
            return serviceNotification.sendGroupNotification(notification);
    }

    @PostMapping(value = "/single", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NotificationResponse> sendSingleNotification
            (@RequestBody Notification notification) {

            return serviceNotification.sendSingleNotification(notification);

    }

}
