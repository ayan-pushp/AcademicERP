package com.ayan.erpbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record StudentResponse(
        @JsonProperty("id")
        Long id,

        @JsonProperty("roll_number")
        String rollNumber,

        @JsonProperty("first_name")
        String firstName,

        @JsonProperty("last_name")
        String lastName,

        @JsonProperty("email")
        String email,

        @JsonProperty("cgpa")
        double cgpa,

        @JsonProperty("domain")
        String domain,

        @JsonProperty("specialisation")
        String specialisation,

        @JsonProperty("cv_application")
        String cvApplication

) {
}
