package com.ayan.erpbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record LoginRequest(
        @NotNull(message="Employee email is required")
        @Email(message = "Email must be in correct format")
        @JsonProperty("email")
        String email,

        @NotBlank(message = "Password should be present")
        @Size(min = 6, max = 12)
        @JsonProperty("password")
        String password
) {
}
