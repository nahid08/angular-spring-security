package com.example.security.controllers;


import com.example.security.dto.BaseDTO;
import com.example.security.dto.ConfrimEmailResponse;
import com.example.security.dto.ForgetPasswordRequestDTO;
import com.example.security.dto.PasswordChangeRequestDTO;
import com.example.security.model.ERole;
import com.example.security.model.Printer;
import com.example.security.model.Role;
import com.example.security.model.User;
import com.example.security.payload.request.LoginRequest;
import com.example.security.payload.request.SignupRequest;
import com.example.security.payload.response.MessageResponse;
import com.example.security.payload.response.UserInfoResponse;
import com.example.security.repository.RoleRepository;
import com.example.security.repository.UserRepository;
import com.example.security.security.jwt.JwtUtils;
import com.example.security.services.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@EnableCaching
//@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthService authService;

    @Autowired
    EmailServiceImpl emailService;

    @Autowired
    SmsService smsService;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @PostMapping("/api/auth/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        UserDetailsImpl userDetails = null;
        ResponseCookie jwtCookie = null;
        List<String> roles = null;
        boolean isLoginFailed = false;

        Printer<Integer> printer = new Printer<>(23);


       try {
           Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
           SecurityContextHolder.getContext().setAuthentication(authentication);

           userDetails = (UserDetailsImpl) authentication.getPrincipal();
           jwtCookie = jwtUtils.generateJwtCookie(userDetails);

           roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());

           HttpHeaders httpHeaders = new HttpHeaders();
           httpHeaders.setAccessControlAllowOrigin("http://localhost:4200");

           userDetailsService.setUser(loginRequest.getUsername());
           userDetailsService.setUserSignInActivity();

       } catch (Exception e) {

           isLoginFailed = true;
       }

       if(isLoginFailed) {
           return ResponseEntity.badRequest().body(new BaseDTO("Invalid Username or Password."));
       }

        return  ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body(new UserInfoResponse(userDetails.getId(), userDetails.getUsername(),
                userDetails.getEmail(), roles));


    }

    @PostMapping("/api/auth/signup")
    public ResponseEntity<?> registerUser( @RequestBody SignupRequest signupRequest) {

        if(userRepository.existsByUsername(signupRequest.getUsername()) || userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("not valid"));
        }

        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(), encoder.encode(signupRequest.getPassword()));

        Set<String> strRoles = signupRequest.getRole();
        Set<Role>roles = new HashSet<>();

        if(strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(
                                () -> new RuntimeException("Role is not found")
                        );
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR).orElseThrow(
                                () -> new RuntimeException("Role is not found")
                        );
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("role is not found"));
                        roles.add(userRole);
                }

            });
        }
        user.setRoles(roles);
        authService.saveNewUser(user);



        return ResponseEntity.ok(new MessageResponse("User registered successfully"));

    }

    @PostMapping("/api/auth/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
//        userDetailsService.setUserSignOutActivity();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(new MessageResponse(" signed out"));
    }

    @PostMapping("/api/auth/confirmemail")
    public ConfrimEmailResponse confirmEmail(@RequestBody  SignupRequest signupRequest) {
        ConfrimEmailResponse response = new ConfrimEmailResponse();
        userDetailsService.sendConfirmationEmail(signupRequest);
        response.setMessage("Email is sent successfully");
        response.setUserData(signupRequest);
        return response;
    }

    @PostMapping("/api/auth/forgetpassword")
    public BaseDTO forgetPassword(@RequestBody ForgetPasswordRequestDTO forgetPasswordRequestDTO) {
        BaseDTO res = new BaseDTO();
        userDetailsService.resetPassword(forgetPasswordRequestDTO.getEmail());
        res.setMessage("Please check your to change your password.");
        return res;
    }

    @PostMapping("/api/auth/changepassword")
    public BaseDTO changePassword(@RequestBody PasswordChangeRequestDTO passwordChangeRequestDTO) {
        BaseDTO res = new BaseDTO();
        userDetailsService.processChangePassword(passwordChangeRequestDTO, encoder);
        res.setMessage("Password is changed successsfully.");
        return res;

    }

    @GetMapping("/api/auth/getalluser")
    public List<User> getAllUser() {

        System.out.println("Redis");
        List<User> userList = userDetailsService.getALlUser();
        return userList;
    }


}
