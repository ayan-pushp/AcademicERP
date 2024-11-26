package com.ayan.erpbackend.controller;

import com.ayan.erpbackend.dto.PlacementOfferResponse;
import com.ayan.erpbackend.dto.PlacementStudentOfferRequest;
import com.ayan.erpbackend.dto.StudentResponse;
import com.ayan.erpbackend.service.PlacementService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/placement")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")

public class PlacementController {

    private PlacementService placementService;

    @GetMapping("/allOffers")
    public ResponseEntity<List<PlacementOfferResponse>> getOrganisationOffers() {
        return ResponseEntity.ok(placementService.getOrganisationOffers());
    }

    @GetMapping("/eligibleFor/{placementId}")
    public ResponseEntity<List<StudentResponse>> getEligibleStudents(@PathVariable Long placementId) {
        return ResponseEntity.ok(placementService.getEligibleStudents(placementId));
    }

    @GetMapping("/appliedTo/{placementId}")
    public ResponseEntity<List<StudentResponse>> getAppliedStudents(@PathVariable Long placementId) {
        return ResponseEntity.ok(placementService.getAppliedStudents(placementId));
    }

    @PostMapping("/accept/{studentId}")
    public ResponseEntity<String> acceptStudent(@PathVariable Long studentId,@RequestBody @Valid PlacementStudentOfferRequest request) {
        return ResponseEntity.ok(placementService.acceptStudent(studentId,request));
    }

    @PostMapping("/reject/{studentId}")
    public ResponseEntity<String> rejectStudent(@PathVariable Long studentId,@RequestBody @Valid PlacementStudentOfferRequest request) {
        return ResponseEntity.ok(placementService.rejectStudent(studentId,request));
    }
}
