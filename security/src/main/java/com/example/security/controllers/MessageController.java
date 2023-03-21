package com.example.security.controllers;


import com.example.security.model.Msg;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Msg hello(Msg msg) throws  Exception {
        Thread.sleep(1000);
        return new Msg("nahid", "hello");
    }
}
