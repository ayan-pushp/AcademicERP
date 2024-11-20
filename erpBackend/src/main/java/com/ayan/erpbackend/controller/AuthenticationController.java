package com.ayan.erpbackend.controller;

import com.ayan.erpbackend.dto.EmployeeRequest;
import com.ayan.erpbackend.dto.LoginRequest;
import com.ayan.erpbackend.service.PlacementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final PlacementService placementService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequest request) {
        return placementService.login(request);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createEmployee(@RequestBody @Valid EmployeeRequest request) {
        return ResponseEntity.ok(placementService.createEmployee(request));
    }
}