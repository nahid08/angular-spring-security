package com.example.security.controllers;


import com.example.security.model.Msg;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class MessageController {

    @MessageMapping("/hello")
    @SendTo("/topic")
    public Msg hello(Msg msg) throws  Exception {
        Thread.sleep(1000);
        return new Msg("nahid", "hello");
    }
}
