package com.example.security.controllers;


import com.example.security.services.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.async.DeferredResult;

import java.time.Duration;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static java.lang.String.format;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class PdfController {

    @Autowired
    PdfService pdfService;

    private ExecutorService bakers = Executors.newFixedThreadPool(5);

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

    @GetMapping("/poll/bake/{bakedGood}")
    public DeferredResult<String> publisher(@PathVariable String bakedGood, @RequestParam Integer bakeTime) {
        DeferredResult<String> output = new DeferredResult<>();

        bakers.execute(() -> {
            try {
                Thread.sleep(bakeTime);
                output.setResult(format("Bake for %s complete and order dispatched. Enjoy!", bakedGood));

            }catch (Exception e) {
               output.onTimeout(() ->  output.setErrorResult("Somethung went wrong with your order!")); ;
            } 
        });

        return output;
    }

    public String callBakeWithRestTemplate(RestTemplateBuilder restTemplateBuilder) {
        RestTemplate restTemplate = restTemplateBuilder.setConnectTimeout(Duration.ofSeconds(10))
                .setReadTimeout(Duration.ofSeconds(10)).build();

        try {
            return restTemplate.getForObject("/poll/bake/cookie?bakeTime=1000", String.class);
        } catch (ResourceAccessException e) {

        }

        return null;
    }
}
