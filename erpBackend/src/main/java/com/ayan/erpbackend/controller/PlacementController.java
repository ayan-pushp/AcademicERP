package com.ayan.erpbackend.controller;

import com.ayan.erpbackend.dto.PlacementOfferResponse;
import com.ayan.erpbackend.entity.Placement;
import com.ayan.erpbackend.helper.JWTHelper;
import com.ayan.erpbackend.service.PlacementService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/placement")
@AllArgsConstructor
public class PlacementController {

    private PlacementService placementService;
    private final JWTHelper jwtHelper;

    @GetMapping("/allOffers")
    public ResponseEntity<List<PlacementOfferResponse>> getAllPlacements(@RequestHeader("Authorization") String authorizationHeader) {

        String token = authorizationHeader.startsWith("Bearer ") ? authorizationHeader.substring(7) : authorizationHeader;
        if (jwtHelper.isTokenExpired(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token is expired");
        }

        List<PlacementOfferResponse> placements = placementService.getAllPlacements();
        return ResponseEntity.ok(placements);
    }
}
