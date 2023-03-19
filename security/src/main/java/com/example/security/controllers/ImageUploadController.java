package com.example.security.controllers;


import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.example.security.dto.FetchResponseDTO;
import com.example.security.dto.UploadDTO;
import com.example.security.dto.UploadResponseDTO;
import com.example.security.services.MetaDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class ImageUploadController {

    @Autowired
    MetaDataService metaDataService;

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
    public  FetchResponseDTO feth(@RequestParam("fileId") int fileId) throws IOException {
        S3Object response = null;
        FetchResponseDTO res = new FetchResponseDTO();
        try {
            response = metaDataService.download(Long.valueOf(fileId));
            res.setS3(response);
        } catch (Exception e) {
           res.setResponse(e.getMessage());
           return res;
        }
        return res;
    }
}
