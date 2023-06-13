package com.example.security.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl  {

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);


    @Autowired
    JavaMailSender emailSender;

   @Async
    public void processEmail(String name) {
        StringBuilder text = new StringBuilder();
        text.append("Hi ");
        text.append(name);
        text.append(", Your login is successful");
        String to = "drmc.nahid@gmail.com";
        String subject = "Successful login";

        String res = sendSimpleMessage(to, subject, text.toString());
        logger.info(res);
    }



    public String sendSimpleMessage(String to, String subject, String text) {
        String res;
      try {
//          SimpleMailMessage msg = new SimpleMailMessage();
//          msg.setFrom("noreply@gmail.com");
//          msg.setTo(to);
//          msg.setSubject(subject);
//          msg.setText(text);
//          emailSender.send(msg);

          MimeMessage mimeMessage = emailSender.createMimeMessage();
          MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
          String htmlMsg = text;
          helper.setText(htmlMsg);
          helper.setTo(to);
          helper.setSubject(subject);
          emailSender.send(mimeMessage);



          res = "Email is send successfully";

      } catch (Exception e) {
          res = e.getMessage();
      }
      return  res;
    }

    public void sendConfirmationEmail() {

    }
}
