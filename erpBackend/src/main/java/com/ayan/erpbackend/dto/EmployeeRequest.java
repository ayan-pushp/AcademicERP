package com.ayan.erpbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EmployeeRequest(
        @NotNull(message="Employee email is required")
        @Email(message = "Email must be in correct format")
        @JsonProperty("email")
        String email,

        @NotBlank(message = "Password should be present")
        @Size(min = 6, max = 12)
        @JsonProperty("password")
        String password,

        @NotBlank(message = "First Name should be present")
        @JsonProperty("first_name")
        String firstName,

        @NotBlank(message = "Last Name should be present")
        @JsonProperty("last_name")
        String lastName,

        @JsonProperty("title")
        String title,

        @NotBlank(message = "Department should be present")
        @JsonProperty("department")
        Long department
        ) {

}
