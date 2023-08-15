package com.example.security.services;

import com.example.security.model.User;
import com.example.security.model.UserDetail;
import com.example.security.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    UserDetailRepository userDetailRepository;

    public List<UserDetail> findAllUsersDetail() {
        List<UserDetail> result = new ArrayList<>();

        List<Object[]> records = userDetailRepository.findAll();

        for(Object[] o: records) {
            UserDetail userDetail = new UserDetail();
            User user = new User();

            userDetail.setUserDetailId((Long) o[0]);
            if(o[1] != null) {
                userDetail.setLastLoggedIn((Date)o[1]);
            }
            if(o[2] != null) {
                userDetail.setLastLoggedOut((Date)o[2]);
            }
            if(o[3] != null) {
                user.setUsername((String) o[3]);
            }
            if(o[4] != null) {
                user.setEmail((String) o[4]);
            }
            userDetail.setUser(user);
            result.add(userDetail);
        }
        return result;
    }


}
