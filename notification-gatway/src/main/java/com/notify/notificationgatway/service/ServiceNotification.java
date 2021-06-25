package com.notify.notificationgatway.service;

import com.notify.notificationgatway.model.Notification;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ServiceNotification {



    public Mono<Notification> sendGroupNotification(Notification notification) {
        return Mono.fromCallable(() -> notification.setAudienceType(Notification.AudienceType.GROUP))
                .map(notification1 -> notification1);
    }

    public Mono<Notification> sendSingleNotification(Notification notification) {
        return Mono.fromCallable(() -> notification.setAudienceType(Notification.AudienceType.SINGLE))
                .map(notification1 -> notification1);

    }

}