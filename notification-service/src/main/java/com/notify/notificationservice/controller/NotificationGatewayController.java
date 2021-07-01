package com.notify.notificationservice.controller;

import com.notify.notificationservice.model.Notification;
import com.notify.notificationservice.model.NotificationGatewayResponse;
import com.notify.notificationservice.service.ServiceNotification;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/notification")
public class NotificationGatewayController {
    private final ServiceNotification serviceNotification;



    public NotificationGatewayController(ServiceNotification serviceNotification) {
        this.serviceNotification = serviceNotification;
    }

    @PostMapping(value = "/group", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NotificationGatewayResponse> sendGroupNotification
            (@RequestBody Notification notification) {
            return serviceNotification.sendGroupNotification(notification);
    }

    @PostMapping(value = "/single", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NotificationGatewayResponse> sendSingleNotification
            (@RequestBody Notification notification) {

            return serviceNotification.sendSingleNotification(notification);

    }

}
