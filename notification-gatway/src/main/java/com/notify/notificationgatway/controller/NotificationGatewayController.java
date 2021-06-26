package com.notify.notificationgatway.controller;

import com.notify.notificationgatway.model.Notification;
import com.notify.notificationgatway.service.ServiceNotification;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/notification")
public class NotificationGatewayController {
    private final ServiceNotification serviceNotification;

    public NotificationGatewayController(ServiceNotification serviceNotification){
        this.serviceNotification = serviceNotification;
    }


    @PostMapping(value = "/group", consumes =MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Notification> sendGroupNotification(@RequestBody Notification notification) {
        return serviceNotification.sendGroupNotification(notification);
    }

    @PostMapping(value = "/single",  consumes =MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Notification> sendSingleNotification(@RequestBody Notification notification) {
        return serviceNotification.sendSingleNotification(notification);
    }

}
