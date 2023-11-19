package com.example.security.controllers;


import com.example.security.model.Greeting;
import com.example.security.model.HelloMessage;
import com.example.security.services.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "ws://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class MessageController {


    @Autowired
    UserInfo userInfo;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws  Exception {
        Thread.sleep(1000);
        return new Greeting("Hello " + userInfo.getUser().getUsername());
    }

    @Scheduled(fixedRate = 5000)
    public void sendMessage() {
//        simpMessagingTemplate.convertAndSend("/topic/warning", "Hello Yours time has come to end.");
    }


 }