package com.example.security.controllers;


import com.amazonaws.services.s3.model.PutObjectResult;
import com.example.security.dto.FetchResponseDTO;
import com.example.security.dto.UploadDTO;
import com.example.security.dto.UploadResponseDTO;
import com.example.security.repository.Itemrepository;
import com.example.security.services.MetaDataServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class ImageUploadController {

    @Autowired
    MetaDataServiceImpl metaDataService;

    @Autowired
    Itemrepository itemrepository;

    @PostMapping("/profile/image/upload")
    public UploadResponseDTO upload(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) throws IOException {
        PutObjectResult response = null;
        UploadResponseDTO res = new UploadResponseDTO();
        try {
            UploadDTO req = new UploadDTO(id, file);
           response = metaDataService.upload(req);
           res.setPutObjectResult(response);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            res.setMessage(e.getMessage());
        }

        return res;

    }


    @GetMapping("/profile/image/fetch")
    public  FetchResponseDTO fetch(@RequestParam("fileId") int fileId) throws IOException {
        String response = null;
        FetchResponseDTO res = new FetchResponseDTO();
        try {

            response = metaDataService.downLoad(Long.valueOf(fileId), "dasdsa");
            res.setImgStr(response);
        } catch (Exception e) {
           res.setResponse(e.getMessage());
           return res;
        }
        return res;
    }

    @GetMapping("/sms/send")
    public String sendSms() {
        return "ok";
    }
}
