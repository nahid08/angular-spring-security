package com.example.security.services;

import com.example.security.dto.PasswordChangeRequestDTO;
import com.example.security.model.ConfirmationToken;
import com.example.security.model.User;
import com.example.security.model.UserDetail;
import com.example.security.payload.request.SignupRequest;
import com.example.security.repository.ConfirmationTokenRepository;
import com.example.security.repository.UserDetailRepository;
import com.example.security.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;



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

    @Autowired
    UserInfo userInfo;

    @Autowired
    UserDetailRepository userDetailRepository;


    @PersistenceContext
    private EntityManager entityManager;



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


    @Transactional
    @Cacheable(value = "users")
    public List<User> getALlUser () {
        List<User> siers = userRepository.findAll();
        return siers;
    }


    public  void setUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            userInfo.setUser(user.get());
        }
    }

    public void setUserSignInActivity() {

        User user = userInfo.getUser();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MMMM-dd HH:mm:ss");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        SimpleDateFormat ldf = new SimpleDateFormat("yyyy-MMMM-dd HH:mm:ss");

        Date d1 = new Date();
       try {
           d1 = ldf.parse(sdf.format(new Date()));
       } catch (Exception e) {

       }

       UserDetail userDetail = new UserDetail(d1, user);

       userDetailRepository.save(userDetail);

    }

    public  void setUserSignOutActivity() {
        User user = userInfo.getUser();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MMMM-dd HH:mm:ss");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        SimpleDateFormat ldf = new SimpleDateFormat("yyyy-MMMM-dd HH:mm:ss");

        Date d1 = new Date();
        try {
            d1 = ldf.parse(sdf.format(new Date()));
        } catch (Exception e) {

        }



        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<UserDetail> cq = cb.createQuery(UserDetail.class);

        Root<UserDetail> root = cq.from(UserDetail.class);

        cq.orderBy(cb.desc(root.get("lastLoggedIn")));

        Predicate userIdPredicate = cb.equal(root.get("user"), user);

        cq.where(userIdPredicate);

        TypedQuery<UserDetail> query = entityManager.createQuery(cq);

        UserDetail loggedOutUserDetail = query.getResultList().get(0);


        loggedOutUserDetail.setLastLoggedOut(d1);;


        userDetailRepository.save(loggedOutUserDetail);



    }


}
