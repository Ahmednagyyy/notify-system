package com.notify.notificationservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.notify.notificationservice.model.Notification;
import com.notify.notificationservice.model.NotificationResponse;
import com.notify.notificationservice.service.ServiceNotification;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(NotificationsController.class)
class NotificationsControllerTest {

    @MockBean
    ServiceNotification serviceNotification;

    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void group_sms_notification_success() throws Exception {
        Notification notification = new Notification();
        notification.setAudienceType(Notification.AudienceType.GROUP)
                .setNotificationType(Notification.NotificationType.SMS)
                .setGroupId("1")
                .setBody("Test Body")
                .setTitle("Test Title");

        NotificationResponse response = new NotificationResponse();
        response.setMessage("Notification sent successfully");
        ResponseEntity<NotificationResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.OK);

        when(serviceNotification.sendGroupNotification(notification)).thenReturn(responseEntity);

        mockMvc.perform(post("/api/notification/group")
                .content(mapper.writeValueAsString(notification))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(responseEntity.getBody().getMessage()))
                .andDo(print());

    }

    @Test
    public void group_push_notification_success() throws Exception {
        Notification notification = new Notification();
        notification.setAudienceType(Notification.AudienceType.GROUP)
                .setNotificationType(Notification.NotificationType.PUSH_NOTIFICATION)
                .setGroupId("1")
                .setBody("Test Body")
                .setTitle("Test Title");

        NotificationResponse response = new NotificationResponse();
        response.setMessage("Notification sent successfully");
        ResponseEntity<NotificationResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.OK);

        when(serviceNotification.sendGroupNotification(notification)).thenReturn(responseEntity);

        mockMvc.perform(post("/api/notification/group")
                .content(mapper.writeValueAsString(notification))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(responseEntity.getBody().getMessage()))
                .andDo(print());

    }

    @Test
    public void single_push_notification_success() throws Exception {
        Notification notification = new Notification();
        notification.setAudienceType(Notification.AudienceType.SINGLE)
                .setNotificationType(Notification.NotificationType.PUSH_NOTIFICATION)
                .setUserId("1")
                .setBody("Test Body")
                .setTitle("Test Title");

        NotificationResponse response = new NotificationResponse();
        response.setMessage("Notification sent successfully");
        ResponseEntity<NotificationResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.OK);

        when(serviceNotification.sendSingleNotification(notification)).thenReturn(responseEntity);

        mockMvc.perform(post("/api/notification/single")
                .content(mapper.writeValueAsString(notification))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(responseEntity.getBody().getMessage()))
                .andDo(print());

    }

    @Test
    public void single_sms_notification_success() throws Exception {
        Notification notification = new Notification();
        notification.setAudienceType(Notification.AudienceType.SINGLE)
                .setNotificationType(Notification.NotificationType.SMS)
                .setUserId("1")
                .setBody("Test Body")
                .setTitle("Test Title");

        NotificationResponse response = new NotificationResponse();
        response.setMessage("Notification sent successfully");
        ResponseEntity<NotificationResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.OK);

        when(serviceNotification.sendSingleNotification(notification)).thenReturn(responseEntity);

        mockMvc.perform(post("/api/notification/single")
                .content(mapper.writeValueAsString(notification))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(responseEntity.getBody().getMessage()))
                .andDo(print());

    }

    @Test
    public void single_sms_notification_fail() throws Exception {
        Notification notification = new Notification();
        notification.setAudienceType(Notification.AudienceType.SINGLE)
                .setNotificationType(Notification.NotificationType.SMS);

        NotificationResponse response = new NotificationResponse();
        response.getErrors().add("Notification body should not be null");
        response.getErrors().add("Notification userId should not be null");
        response.getErrors().add("Notification title should not be null");

        ResponseEntity<NotificationResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        when(serviceNotification.sendSingleNotification(notification)).thenReturn(responseEntity);

        mockMvc.perform(post("/api/notification/single")
                .content(mapper.writeValueAsString(notification))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors[0]").value("Notification body should not be null"))
                .andExpect(jsonPath("$.errors[1]").value("Notification userId should not be null"))
                .andExpect(jsonPath("$.errors[2]").value("Notification title should not be null"))
                .andDo(print());

    }

    @Test
    public void single_push_notification_fail() throws Exception {
        Notification notification = new Notification();
        notification.setAudienceType(Notification.AudienceType.SINGLE)
                .setNotificationType(Notification.NotificationType.PUSH_NOTIFICATION);

        NotificationResponse response = new NotificationResponse();
        response.getErrors().add("Notification body should not be null");
        response.getErrors().add("Notification userId should not be null");
        response.getErrors().add("Notification title should not be null");

        ResponseEntity<NotificationResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        when(serviceNotification.sendSingleNotification(notification)).thenReturn(responseEntity);

        mockMvc.perform(post("/api/notification/single")
                .content(mapper.writeValueAsString(notification))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors[0]").value("Notification body should not be null"))
                .andExpect(jsonPath("$.errors[1]").value("Notification userId should not be null"))
                .andExpect(jsonPath("$.errors[2]").value("Notification title should not be null"))
                .andDo(print());

    }

    @Test
    public void group_push_notification_fail() throws Exception {
        Notification notification = new Notification();
        notification.setAudienceType(Notification.AudienceType.GROUP)
                .setNotificationType(Notification.NotificationType.PUSH_NOTIFICATION);

        NotificationResponse response = new NotificationResponse();
        response.getErrors().add("Notification groupId should not be null");
        response.getErrors().add("Notification body should not be null");
        response.getErrors().add("Notification title should not be null");

        ResponseEntity<NotificationResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        when(serviceNotification.sendGroupNotification(notification)).thenReturn(responseEntity);

        mockMvc.perform(post("/api/notification/group")
                .content(mapper.writeValueAsString(notification))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors[0]").value("Notification groupId should not be null"))
                .andExpect(jsonPath("$.errors[1]").value("Notification body should not be null"))
                .andExpect(jsonPath("$.errors[2]").value("Notification title should not be null"))
                .andDo(print());

    }

    @Test
    public void group_sms_notification_fail() throws Exception {
        Notification notification = new Notification();
        notification.setAudienceType(Notification.AudienceType.GROUP)
                .setNotificationType(Notification.NotificationType.SMS);

        NotificationResponse response = new NotificationResponse();
        response.getErrors().add("Notification groupId should not be null");
        response.getErrors().add("Notification body should not be null");
        response.getErrors().add("Notification title should not be null");

        ResponseEntity<NotificationResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        when(serviceNotification.sendGroupNotification(notification)).thenReturn(responseEntity);

        mockMvc.perform(post("/api/notification/group")
                .content(mapper.writeValueAsString(notification))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors[0]").value("Notification groupId should not be null"))
                .andExpect(jsonPath("$.errors[1]").value("Notification body should not be null"))
                .andExpect(jsonPath("$.errors[2]").value("Notification title should not be null"))
                .andDo(print());

    }
}