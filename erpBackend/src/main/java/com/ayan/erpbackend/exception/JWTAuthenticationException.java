package com.ayan.erpbackend.exception;

public class JWTAuthenticationException extends RuntimeException {
    public JWTAuthenticationException(String message) {
        super(message);
    }
}
