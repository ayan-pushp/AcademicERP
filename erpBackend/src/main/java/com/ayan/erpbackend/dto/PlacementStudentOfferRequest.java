package com.ayan.erpbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public record PlacementStudentOfferRequest(
        @NotNull(message="Employee email is required")
        @JsonProperty("comment")
        String comment,

        @NotNull(message="Placement Id is required")
        @JsonProperty("placement_id")
        Long placementId,

        @NotNull(message="Student Name is required")
        @JsonProperty("student_name")
        String studentName,

        @NotNull(message="Company Name is required")
        @JsonProperty("company")
        String companyName

) {
}
