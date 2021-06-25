package com.notify.notificationgatway.model;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@Accessors(chain = true)
public class Notification {

    private String message;

    private String groupId;

    private String userId;

    private String sendBy;

    @Enumerated(EnumType.STRING)
    private AudienceType audienceType;

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    public enum AudienceType {
        SINGLE,
        GROUP
    }

    public enum NotificationType {
        SMS,
        PUSH_NOTIFICATION
    }

}