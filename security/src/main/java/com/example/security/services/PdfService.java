package com.example.security.services;


import com.example.security.dto.FileDownloadResponseDTO;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;

@Service
public class PdfService {

    @Autowired
    UserInfo userInfo;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;


    public ByteArrayResource generatePdf() throws DocumentException, FileNotFoundException {
        FileDownloadResponseDTO res = new FileDownloadResponseDTO();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, byteArrayOutputStream);
        document.open();
        Font font = FontFactory.getFont(FontFactory.COURIER, 16 , BaseColor.BLACK);

        Paragraph par = new Paragraph("Username: " + userInfo.getUser().getUsername(), font);

        document.add(par);
        Chunk chunk = new Chunk("Email: " + userInfo.getUser().getEmail());
        document.add(chunk);

        document.close();
        byte[] pdfByte = byteArrayOutputStream.toByteArray();
        ByteArrayResource resource = new ByteArrayResource(pdfByte);
//        sendMessage("helloworld");
        return resource;
    }

//    public  void sendMessage(String msg) {
//
//        CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send("topic", msg);
//        future.whenComplete((result, ex) -> {
//            if(ex == null) {
//                System.out.println("Send Apache Kafka message");
//            } else {
//                System.out.println("Unable to send message");
//            }
//        });
//
//    }
//
//    @KafkaListener(topics = "topic", groupId = "topic")
//    public void listenGroupFoo(String msg) {
//        System.out.println(msg);
//    }


}
