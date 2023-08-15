package com.example.security.controllers;


import com.example.security.dto.UserDetailListResponseDTO;
import com.example.security.model.UserDetail;
import com.example.security.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class AdminController {

    @Autowired
    UserDetailRepository userDetailRepository;

    @GetMapping("/admin/allusers")
    public UserDetailListResponseDTO getAllUsers() {
        UserDetailListResponseDTO response = new UserDetailListResponseDTO();
        List<UserDetail> res =  userDetailRepository.findAll();
        response.setUserDetailList(res);
        return response;
    }
}