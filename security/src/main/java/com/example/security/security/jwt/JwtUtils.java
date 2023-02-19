package com.example.security.security.jwt;

import com.example.security.services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);


    @Value("${nahid08.app.jwtSecret}")
    private  String jwtSecret;

    @Value("${nahid08.app.jwtExpirationMs}")
    private int jwtExpirationsMs;

    @Value("${nahid08.app.jwtCookieName}")
    private  String jwtCookie;

    public String getJwtFromCookies(HttpServletRequest request) {

        logger.info("Get Jwt From Cookies in the method - getJwtFromCookies in JwtUtils.java");
        Cookie cookie = WebUtils.getCookie(request, jwtCookie);
        if (cookie != null) {
            return  cookie.getValue();
        } else {
            return null;
        }
    }

    public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal) {
        logger.info("Generate Jwt Cookie in the method - generateJwtCookie in JwtUtils.java");
        String jwt = generateTokenFromUsername(userPrincipal.getUsername());
        ResponseCookie cookie = ResponseCookie.from(jwtCookie, jwt).path("/api").maxAge(24*60*60).httpOnly(true).build();
        return cookie;
    }

    public ResponseCookie getCleanJwtCookie() {
        ResponseCookie cookie = ResponseCookie.from(jwtCookie, null).path("/api").build();
        return cookie;
    }

    public boolean validateJwtToken(String authToken) {
        try {
            logger.info("Validate Jwt Token in the method - validateJwtToken");
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJwt(authToken);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    public String getUserNameFromJwtToken(String token) {
        logger.info("Get UserName from JWT Token");
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJwt(token).getBody().getSubject();
    }

   public String generateTokenFromUsername(String username) {

        logger.info("Generating Token");
        return Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(new Date((new Date()).getTime() + jwtExpirationsMs)).
                signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
   }



}
