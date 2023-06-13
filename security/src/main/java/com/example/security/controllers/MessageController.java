package com.example.security.controllers;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class MessageController {

//   @GetMapping("/sms/send")
//    public String sendSms() {
//       return "ok";
//   }
}
