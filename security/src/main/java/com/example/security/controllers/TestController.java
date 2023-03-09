package com.example.security.controllers;


import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
//@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/api/test/all")
    public String allAccess() {
        int leftLimit = 97;
        int rightLimit = 122;
        int targetStringLength = 10;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(10);
        for(int i =1; i<=targetStringLength;i++) {
            int randomLimitedInt = leftLimit + (int)(random.nextFloat()* (rightLimit - leftLimit + 1));
            buffer.append((char)randomLimitedInt);
        }

        return buffer.toString();
    }

    @GetMapping("/api/test/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content";
    }

    @GetMapping("api/test/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean adminAccess() {
        return true;
    }

    @GetMapping("api/test/mod")
    @Secured("MODERATOR")
    public String modAccess() {
        return "Moderator Board";
    }


}
