package com.example.security.services;


import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${twilio.access.sid}")
    String sid;

    @Value("${twilio.access.token}")
    String token;


    public void sendSms() {

        Twilio.init(sid, token);
        Message.creator(new PhoneNumber("+8801626301678"), new PhoneNumber("+13614016608"), "Message sent from spring boot application").create();

    }
}
