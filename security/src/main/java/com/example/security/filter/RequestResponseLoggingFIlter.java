package com.example.security.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class RequestResponseLoggingFIlter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(RequestResponseLoggingFIlter.class);


    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse res = (HttpServletResponse) servletResponse;


        logger.info("Remote Address " + req.getRemoteAddr());
        logger.info("Remote Host " + req.getRemoteHost());

        filterChain.doFilter(servletRequest, servletResponse);


    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
