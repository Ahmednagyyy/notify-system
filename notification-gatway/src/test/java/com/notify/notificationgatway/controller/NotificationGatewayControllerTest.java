package com.notify.notificationgatway.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.notify.notificationgatway.model.Notification;
import com.notify.notificationgatway.service.ServiceNotification;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import reactor.core.publisher.Mono;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(NotificationGatewayController.class)
class NotificationGatewayControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    ServiceNotification serviceNotification;

    Notification notificationGroup = new Notification()
            .setMessage("Use Promo code 'D50' for 50% discount")
            .setNotificationType(Notification.NotificationType.SMS);

    Notification notificationSingle = new Notification()
            .setMessage("Your drop-off station is coming")
            .setNotificationType(Notification.NotificationType.PUSH_NOTIFICATION);

    @Test
    void sendGroupNotification() throws Exception {
        Notification res = new Notification()
                .setMessage("Use Promo code 'D50' for 50% discount")
                .setNotificationType(Notification.NotificationType.SMS)
                .setAudienceType(Notification.AudienceType.GROUP);
        Mockito.when(serviceNotification.sendGroupNotification(notificationGroup)).thenReturn(Mono.just(res));

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/api/notification/group")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(this.mapper.writeValueAsString(notificationGroup));

        mockMvc.perform(mockRequest)
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Use Promo code 'D50' for 50% discount")));


    }

    @Test
    void sendSingleNotification() throws Exception {
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/api/notification/single")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(this.mapper.writeValueAsString(notificationSingle));

        mockMvc.perform(mockRequest)
                .andDo(print())
                .andExpect(status().isOk());
    }

}