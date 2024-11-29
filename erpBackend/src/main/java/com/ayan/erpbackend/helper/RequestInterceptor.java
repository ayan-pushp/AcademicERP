package com.ayan.erpbackend.helper;

import com.ayan.erpbackend.exception.JWTAuthenticationException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import io.jsonwebtoken.ExpiredJwtException;

@Component
@RequiredArgsConstructor
    public class RequestInterceptor implements HandlerInterceptor {

        private final JWTHelper jwtUtil;

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            String authorizationHeader = request.getHeader("Authorization");

            // Check if the authorization header is present and starts with "Bearer "
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                throw new JWTAuthenticationException("Authorization header missing or malformed.");
            }

            String token = authorizationHeader.substring(7); // Extract token from "Bearer {token}"

            try {
                String username = jwtUtil.extractUsername(token);

                if (username == null || !jwtUtil.validateToken(token, username)) {
                    throw new JWTAuthenticationException("Invalid JWT token.");
                }

            } catch (ExpiredJwtException e) {
                throw new JWTAuthenticationException("Token expired: " + e.getMessage());
            } catch (Exception e) {
                throw new JWTAuthenticationException("Token validation failed: " + e.getMessage());
            }

            return true;
        }
    }

