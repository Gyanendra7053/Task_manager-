package com.gyanendra.taskmanager.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;


    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }



    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {


        String authHeader = request.getHeader("Authorization");


        // If Authorization header is missing or not Bearer token
        if(authHeader == null || 
           !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }


        String token = authHeader.substring(7);


        // Check JWT format before parsing
        if(token.isBlank() || token.split("\\.").length != 3) {

            filterChain.doFilter(request, response);
            return;
        }


        try {

            String email = jwtService.extractEmail(token);


            if(email != null &&
               SecurityContextHolder.getContext()
               .getAuthentication() == null) {


                UserDetails userDetails =
                        userDetailsService
                        .loadUserByUsername(email);



                if(jwtService.isTokenValid(token, userDetails)) {


                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );


                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);

                }
            }


        } catch (Exception e) {

            System.out.println("Invalid JWT Token: " + e.getMessage());

        }


        filterChain.doFilter(request,response);

    }
}