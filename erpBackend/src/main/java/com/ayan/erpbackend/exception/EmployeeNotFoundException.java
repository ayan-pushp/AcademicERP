package com.ayan.erpbackend.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EmployeeNotFoundException extends RuntimeException {

        public EmployeeNotFoundException(String message) {
                super(message);
        }

        public EmployeeNotFoundException(String message, Throwable cause) {
                super(message, cause);
        }
}

