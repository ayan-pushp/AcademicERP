package com.ayan.erpbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PlacementOfferResponse(
        @JsonProperty("organisation")
        String organisation,

        @JsonProperty("profile")
        String profile,

        @JsonProperty("description")
        String description,

        @JsonProperty("minimumGrade")
        double minimumGrade,

        @JsonProperty("intake")
        double intake,

        @JsonProperty("specialisation")
        String specialisation,

        @JsonProperty("domain")
        String domain
) {
}
