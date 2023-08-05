package com.example.security.controllers;


import com.example.security.services.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class PdfController {

    @Autowired
    PdfService pdfService;

//    @GetMapping("/pdf/download")
//    public FileDownloadResponseDTO getPdfFile() {
//        FileDownloadResponseDTO response = null;
//        try {
//            response = pdfService.generatePdf();
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        return response;
//    }

    @GetMapping("/pdf/download")
    public ResponseEntity<ByteArrayResource> getPdfFile() {
        ByteArrayResource resource = null;
        try {
            resource = pdfService.generatePdf();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).
                contentLength(resource.contentLength())
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename("test").build().toString())
                .body(resource);

    }
}
