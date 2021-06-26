package com.notify.notificationgatway.broker;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(KafkaProps.class)
public class KafkaConfig {

    private KafkaProps kafkaProps;
    private ObjectMapper objectMapper;

    public KafkaConfig(KafkaProps kafkaProps, ObjectMapper objectMapper) {
        this.kafkaProps = kafkaProps;
        this.objectMapper = objectMapper;
    }

    /**
     * initializing serviceKafkaTemplate by @bean to use it freely in the application
     * this template contains anything related to kafka integration
     */
    @Bean
    public KafkaService serviceKafkaTemplate() {
        return new KafkaService(kafkaProps, objectMapper);
    }

}
