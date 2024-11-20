package com.ayan.erpbackend.service;

import com.ayan.erpbackend.dto.EmployeeRequest;
import com.ayan.erpbackend.dto.LoginRequest;
import com.ayan.erpbackend.entity.Employee;
import com.ayan.erpbackend.helper.JWTHelper;
import com.ayan.erpbackend.helper.EncryptionService;
import com.ayan.erpbackend.repo.EmployeeRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class PlacementService {
    private final EmployeeRepository employeeRepo;
    private final EncryptionService encryptionService;
    private final JWTHelper jwtHelper;

    public String createEmployee(EmployeeRequest request) {
        Employee employee = new Employee();
        employee.setEmail(request.email());
        employee.setFirstName(request.firstName());
        employee.setLastName(request.lastName());
        employee.setDepartment(request.department());
        employee.setTitle(request.title());
        employee.setPassword(encryptionService.encode(request.password()));
        employeeRepo.save(employee);

        return "Employee Created Successfully";
    }

    public ResponseEntity<String> login(LoginRequest request) {
        Employee employee;

        Optional<Employee> employeeOptional = employeeRepo.findByEmail(request.email());
        if (employeeOptional.isEmpty()) {
            throw new NoSuchElementException("Employee with email " + request.email() + " not found");
        }

        employee = employeeOptional.get();  // Unwrap the Optional

        // Check if the password is correct
        if (!encryptionService.validates(request.password(), employee.getPassword())){
            return new ResponseEntity<>("Wrong Password", HttpStatus.BAD_REQUEST); // 400 Bad Request for wrong password
        }

        // If both email and password are correct, generate the token
        String token = jwtHelper.generateToken(request.email());
        return new ResponseEntity<>("Employee logged in successfully!\n Here's the token: " + token, HttpStatus.OK); // 200 OK for success
    }

}

