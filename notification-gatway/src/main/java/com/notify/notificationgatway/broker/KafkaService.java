package com.notify.notificationgatway.broker;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.notify.notificationgatway.model.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaService {

	private KafkaProps kafkaProps;
	private ObjectMapper objectMapper;

	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;

	/**
	 * @param kafkaProps
	 * @param objectMapper
	 * Initializing kafka props to get topic values from env variables
	 * and object mapper to convert notification to stringJson
	 */
	public KafkaService(KafkaProps kafkaProps, ObjectMapper objectMapper) {
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

	/**
	 * Testing Topic publishing and pulling
	 */
//	@KafkaListener(topics = "group_notification_topic",
//			groupId = "notifications-stream")
//	public void consumeGroup(String message)
//	{
//		log.info(String.format("Message recieved -> %s", message));
//	}
//
//	@KafkaListener(topics = "single_notification_topic",
//			groupId = "notifications-stream")
//	public void consumeSingle(String message)
//	{
//		log.info(String.format("Message recieved -> %s", message));
//	}
}