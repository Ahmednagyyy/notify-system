package com.notify.notificationgatway.service;

import com.notify.notificationgatway.broker.KafkaService;
import com.notify.notificationgatway.model.Notification;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class ServiceNotification {

    private KafkaService kafkaService;

    public ServiceNotification(KafkaService kafkaService){
        this.kafkaService = kafkaService;
    }

    /**
     * @param notification
     * Receive the group notification and update the notification type before publishing it by kafka
     */
    public Notification sendGroupNotification(Notification notification) {
        return Mono.fromCallable(() -> notification.setAudienceType(Notification.AudienceType.GROUP))
                .map(not -> {
                    kafkaService.publishNotification(notification);
                    return notification;
                }).block();

    }

    /**
     * @param notification
     * Receive the single notification and update the notification type before publishing it by kafka
     */
    public Notification sendSingleNotification(Notification notification) {
        return Mono.fromCallable(() -> notification.setAudienceType(Notification.AudienceType.SINGLE))
                .map(not -> {
                    kafkaService.publishNotification(notification);
                    return notification;
                }).block();

    }

}