package com.notify.notificationservice.broker;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.notify.notificationservice.model.Notification;
import io.github.bucket4j.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@Slf4j
public class KafkaService {

	private KafkaProps kafkaProps;
	private ObjectMapper objectMapper;
	private final Bucket bucket;

	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;

	/**
	 * @param kafkaProps
	 * @param objectMapper
	 * Initializing kafka props to get topic values from env variables
	 * and object mapper to convert notification to stringJson
	 */
	public KafkaService(KafkaProps kafkaProps, ObjectMapper objectMapper) {
		Refill refill = Refill.intervally(10, Duration.ofMinutes(1));
		Bandwidth limit = Bandwidth.classic(10, refill);
		this.bucket = Bucket4j.builder()
				.addLimit(limit)
				.build();
		this.kafkaProps = kafkaProps;
		this.objectMapper = objectMapper;
	}

	/**
	 * @param notification
	 * publishNotification function is responsible for publishing requested notification into kafka server
	 * it sends 2 types of messages ( Group / Single ) based on the requested notification type
	 */
	public void publishNotification(Notification notification) {
		String notificationAsString;
		try {
			notificationAsString = objectMapper.writeValueAsString(notification);
			if(notification.getAudienceType().equals(Notification.AudienceType.GROUP)){
				log.info("Publish Group Notification \n Notification content: "
						+ notificationAsString + "\n on Topic name: " + kafkaProps.getTopics().getGroupNotification());
				kafkaTemplate.send(kafkaProps.getTopics().getGroupNotification(), notificationAsString);
			}

			if(notification.getAudienceType().equals(Notification.AudienceType.SINGLE)){
				log.info("Publish Single Notification \n Notification content: "
						+ notificationAsString + "\n on Topic name: " + kafkaProps.getTopics().getSingleNotification());
				kafkaTemplate.send(kafkaProps.getTopics().getSingleNotification(), notificationAsString);
			}
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}

	@KafkaListener(topics = "sms_notification_topic",
			groupId = "group-id")
	public void consumeSms(String message)
	{
			ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);
			if (probe.isConsumed()) {
				log.info(String.format("SMS sent -> %s", message));
			}
			else {
				long waitForRefill = probe.getNanosToWaitForRefill() / 1_000_000_000;
				log.info("SMS Requests exceeded rate limit, please try again after "
						+ waitForRefill
						+ " Seconds");
			}


	}

	@KafkaListener(topics = "push_notification_topic",
			groupId = "group-id")
	public void consumePush(String message)
	{
		log.info(String.format("PUSH Notification sent -> %s", message));
	}
}