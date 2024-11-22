package com.ayan.erpbackend.service;

import com.ayan.erpbackend.dto.*;
import com.ayan.erpbackend.entity.Department;
import com.ayan.erpbackend.entity.Employee;
import com.ayan.erpbackend.entity.Placement;
import com.ayan.erpbackend.helper.JWTHelper;
import com.ayan.erpbackend.helper.EncryptionService;
import com.ayan.erpbackend.repo.DepartmentRepository;
import com.ayan.erpbackend.repo.EmployeeRepository;

import com.ayan.erpbackend.repo.PlacementRepository;
import com.ayan.erpbackend.repo.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class PlacementService {
    private final PlacementRepository placementRepo;
    private final EmployeeRepository employeeRepo;
    private final StudentRepository studentRepo;
    private final DepartmentRepository departmentRepo;

    private final EncryptionService encryptionService;
    private final JWTHelper jwtHelper;

    public String createEmployee(EmployeeRequest request) {
        // Retrieve the department entity based on the department ID
        Department department = departmentRepo.findById(request.department())
                .orElseThrow(() -> new NoSuchElementException("Department with ID " + request.department() + " not found"));

        Employee employee = new Employee();
        employee.setEmail(request.email());
        employee.setFirstName(request.firstName());
        employee.setLastName(request.lastName());
        employee.setDepartment(department);
        employee.setTitle(request.title());
        employee.setPassword(encryptionService.encode(request.password()));
        employeeRepo.save(employee);

        return "Employee Created Successfully";
    }

    public ResponseEntity<String> login(LoginRequest request) {
        Employee employee;

        // Check if the employee exists
        Optional<Employee> employeeOptional = employeeRepo.findByEmail(request.email());
        if (employeeOptional.isEmpty()) {
            throw new NoSuchElementException("Employee with email " + request.email() + " not found!");
        }

        employee = employeeOptional.get();  // Unwrap the Optional

        // Check if the password is correct
        if (!encryptionService.validates(request.password(), employee.getPassword())){
            return new ResponseEntity<>("Wrong Password!", HttpStatus.BAD_REQUEST); // 400 Bad Request for wrong password
        }

        // Check if the department is Outreach
        if(!employee.getDepartment().getName().equals("Outreach")){
            return new ResponseEntity<>("Department "+employee.getDepartment()+" unauthorized!", HttpStatus.UNAUTHORIZED);
        }

        // If email, password and department are correct, generate the token
        String token = jwtHelper.generateToken(request.email());
        return new ResponseEntity<>("Employee logged in successfully!\nHere's the token: " + token, HttpStatus.OK); // 200 OK for success
    }

    public List<StudentResponse> getEligibleStudents(Long placementId){
        // Check if the placement id exists
        Optional<Placement> placementOptional = placementRepo.findById(placementId);
        if (placementOptional.isEmpty()) {
            throw new NoSuchElementException("Placement Id " + placementId + " not found!");
        }
        return studentRepo.findEligibleStudents(placementId);
    }

    public List<StudentResponse> getAppliedStudents(Long placementId){
        // Check if the placement id exists
        Optional<Placement> placementOptional = placementRepo.findById(placementId);
        if (placementOptional.isEmpty()) {
            throw new NoSuchElementException("Placement Id " + placementId + " not found!");
        }
        return studentRepo.findAppliedStudents(placementId);
    }

    public List<Object[]> getOrganisationOffersWithFilteredStudents(Long domain, Long specialisation, Float minGrade) {
        return placementRepo.findOrganisationOffersWithFilteredStudents(domain, specialisation, minGrade);
    }
}

