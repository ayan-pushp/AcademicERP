package com.ayan.erpbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record StudentResponse(
        @JsonProperty("roll_number")
        String rollNumber,

        @JsonProperty("first_name")
        String firstName,

        @JsonProperty("last_name")
        String lastName,

        @JsonProperty("email")
        String email,

        @JsonProperty("cgpa")
        double cgpa
) {
}
