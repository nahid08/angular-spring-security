package com.example.security.services;

import com.example.security.dto.PasswordChangeRequestDTO;
import com.example.security.model.ConfirmationToken;
import com.example.security.model.User;
import com.example.security.payload.request.SignupRequest;
import com.example.security.repository.ConfirmationTokenRepository;
import com.example.security.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsImpl.class);


    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailServiceImpl emailService;

    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;



    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("load username");
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with user"));

        return UserDetailsImpl.build(user);
    }

    @Async
    public void sendConfirmationEmail(SignupRequest signUpRequest) {
        String to = signUpRequest.getEmail();
        String subject = "Please Confirm your email";
        StringBuilder text = new StringBuilder();
        text.append("Click on this link to verify your account - ");
        text.append("http://localhost:4200/authenticate");
        emailService.sendSimpleMessage(to, subject, text.toString());
    }

    public void resetPassword(String email) {

        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent()) {
            String token = UUID.randomUUID().toString();
            ConfirmationToken x = new ConfirmationToken(token, user.get());
            String to = "drmc.nahid@gmail.com";
            String subject = "Password Change Confirmation";
            StringBuilder text = new StringBuilder();
            text.append("Click on this link to change your password: ");
            text.append("http://localhost:4200/resetpassword?token=");
            text.append(token);
            confirmationTokenRepository.save(x);
            emailService.sendSimpleMessage(to, subject, text.toString());

        }

    }

    public void processChangePassword(PasswordChangeRequestDTO passwordChangeRequestDTO, PasswordEncoder encoder) {

        Optional<ConfirmationToken> user = confirmationTokenRepository.findFirstByToken(passwordChangeRequestDTO.getToken());

        if(user.isPresent()) {
            User updatedUser = user.get().getUser();
            updatedUser.setPassword(encoder.encode(passwordChangeRequestDTO.getPassword()));
            userRepository.save(updatedUser);
        }
    }


}
