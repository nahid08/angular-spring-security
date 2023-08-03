package com.example.security.component;

import com.example.security.model.ERole;
import com.example.security.model.Role;
import com.example.security.repository.RoleRepository;
import com.example.security.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class RoleEntry implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    StudentRepository studentRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Testing Component annotation");

        List<ERole> roles = new ArrayList<>(Arrays.asList(ERole.ROLE_ADMIN, ERole.ROLE_MODERATOR, ERole.ROLE_USER));

        roles.forEach(role -> {
            Optional<Role> x = roleRepository.findByName(role);
            if(x.isEmpty()) {
                roleRepository.save(new Role(role));
            }
        });

//        Student student = new Student("nahid", "John Doe", Student.Gender.MALE, 1);
//
//        studentRepository.save(student);
//


    }
}
