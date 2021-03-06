package com.notify.notificationservice.model;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Accessors(chain = true)
public class NotificationResponse {

    private Set<String> errors = new HashSet<>();

    private String message;

    private String notificationBody;

}