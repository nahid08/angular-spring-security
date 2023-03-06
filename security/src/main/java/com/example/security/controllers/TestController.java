package com.example.security.controllers;


import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
//@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/api/test/all")
    public String allAccess() {
        return "Public Content";
    }

    @GetMapping("/api/test/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content";
    }

    @GetMapping("api/test/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board";
    }

    @GetMapping("api/test/mod")
    @Secured("MODERATOR")
    public String modAccess() {
        return "Moderator Board";
    }


}
