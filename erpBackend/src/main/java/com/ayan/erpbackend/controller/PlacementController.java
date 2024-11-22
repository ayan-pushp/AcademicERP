package com.ayan.erpbackend.controller;

import com.ayan.erpbackend.dto.PlacementOfferResponse;
import com.ayan.erpbackend.dto.StudentResponse;
import com.ayan.erpbackend.helper.JWTHelper;
import com.ayan.erpbackend.service.PlacementService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/placement")
@AllArgsConstructor
public class PlacementController {

    private PlacementService placementService;
    private final JWTHelper jwtHelper;

    @GetMapping("/allOffers")
    public ResponseEntity<List<Object[]>> getOrganisationOffersWithStudents(
            @RequestParam(name = "domain", required = false) Long domain,
            @RequestParam(name = "specialisation", required = false) Long specialisation,
            @RequestParam(name = "minGrade", required = false) Float minGrade) {

        return ResponseEntity.ok(placementService.getOrganisationOffersWithFilteredStudents(domain, specialisation, minGrade));
    }

    @GetMapping("/eligibleFor/{placementId}")
    public ResponseEntity<List<StudentResponse>> getEligibleStudents(@PathVariable Long placementId) {
        List<StudentResponse> eligibleStudents = placementService.getEligibleStudents(placementId);
        return ResponseEntity.ok(eligibleStudents);
    }

    @GetMapping("/appliedTo/{placementId}")
    public ResponseEntity<List<StudentResponse>> getAppliedStudents(@PathVariable Long placementId) {
        List<StudentResponse> eligibleStudents = placementService.getAppliedStudents(placementId);
        return ResponseEntity.ok(eligibleStudents);
    }
}
