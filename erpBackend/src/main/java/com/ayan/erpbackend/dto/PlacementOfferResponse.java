package com.ayan.erpbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PlacementOfferResponse(
        @JsonProperty("name")
        String name,

        @JsonProperty("address")
        String address,

        @JsonProperty("id")
        Long id,

        @JsonProperty("profile")
        String profile,

        @JsonProperty("description")
        String description,

        @JsonProperty("intake")
        int intake,

        @JsonProperty("minimum_grade")
        double minimumGrade

) {

}
