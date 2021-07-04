package com.notify.notificationservice.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;

@Getter
@Setter
@Data
@Accessors(chain = true)
public class Notification {

    private String title;

    private String body;

    private String groupId;

    private Date createdAt;

    private String userId;

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