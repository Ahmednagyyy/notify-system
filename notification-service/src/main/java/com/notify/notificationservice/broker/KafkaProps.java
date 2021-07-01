package com.notify.notificationservice.broker;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "broker")
public class KafkaProps {

    private Topics topics;

    private Subscriptions subscriptions;

    @Getter
    @Setter
    @Accessors(chain = true)
    public static class Topics {

        private String groupNotification;
        private String singleNotification;

    }

    @Getter
    @Setter
    @Accessors(chain = true)
    public static class Subscriptions {

        private String smsNotification;
        private String pushNotification;

    }
}