package com.example.security.services;

import com.example.security.model.File;
import com.example.security.model.User;
import com.example.security.repository.FileMetaRepository;
import com.example.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    FileMetaRepository fileMetaRepository;

    public void saveNewUser(User user) {

        User newUser = userRepository.save(user);
        fileMetaRepository.save(new File("","","", user));

    }
}
