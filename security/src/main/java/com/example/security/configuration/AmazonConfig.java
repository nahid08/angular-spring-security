package com.example.security.configuration;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


@Configuration
public class AmazonConfig {

    @Value("${aws.access.key.id}")
    private String accessKey;

    @Value("${aws.secret.access.key}")
    private String secretKey;

    @Value("${aws.s3.region}")
    private String region;



}
