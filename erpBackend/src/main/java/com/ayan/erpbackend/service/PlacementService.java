package com.ayan.erpbackend.service;

import com.ayan.erpbackend.dto.*;
import com.ayan.erpbackend.entity.Department;
import com.ayan.erpbackend.entity.Employee;
import com.ayan.erpbackend.entity.Placement;
import com.ayan.erpbackend.entity.Student;
import com.ayan.erpbackend.helper.JWTHelper;
import com.ayan.erpbackend.helper.EncryptionService;
import com.ayan.erpbackend.repo.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class PlacementService {
    private final PlacementRepository placementRepo;
    private final EmployeeRepository employeeRepo;
    private final StudentRepository studentRepo;
    private final DepartmentRepository departmentRepo;
    private final PlacementStudentRepository placementStudentRepo;
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
            return new ResponseEntity<>("Employee with email " + request.email() + " not found!", HttpStatus.NOT_FOUND);
        }

        employee = employeeOptional.get();  // Unwrap the Optional

        // Check if the password is correct
        if (!encryptionService.validates(request.password(), employee.getPassword())){
            return new ResponseEntity<>("Wrong Password!", HttpStatus.BAD_REQUEST);
        }

        // Check if the department is Outreach
        if(!employee.getDepartment().getName().equals("Outreach")){
            return new ResponseEntity<>("Department "+employee.getDepartment()+" unauthorized!", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtHelper.generateToken(request.email());

        try {
            String responseJson = new ObjectMapper().writeValueAsString(Map.of("token", token,"name",employee.getFirstName()));
            return new ResponseEntity<>(responseJson, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error generating token", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<PlacementOfferResponse> getOrganisationOffers() {
        System.out.println("Fetching placement offers...");
        List<PlacementOfferResponse> offers = placementRepo.findOrganisationOffers();
        if (offers.isEmpty()) {
            throw new NoSuchElementException("No Offers at the moment!");
        }
        return offers;

    }

    public List<StudentResponse> getEligibleStudents(Long placementId){
        System.out.println("Fetching eligible students...");
        // Check if the placement id exists
        Optional<Placement> placementOptional = placementRepo.findById(placementId);
        if (placementOptional.isEmpty()) {
            throw new NoSuchElementException("Placement Id " + placementId + " not found!");
        }
        return studentRepo.findEligibleStudents(placementId);
    }

    public List<StudentResponse> getAppliedStudents(Long placementId){
        System.out.println("Fetching applied students...");
        // Check if the placement id exists
        Optional<Placement> placementOptional = placementRepo.findById(placementId);
        if (placementOptional.isEmpty()) {
            throw new NoSuchElementException("Placement Id " + placementId + " not found!");
        }
        return studentRepo.findAppliedStudents(placementId);
    }

    public String acceptStudent(Long studentId,PlacementStudentOfferRequest request) {
        System.out.println("Accepting student...");
        Optional<Student> student = studentRepo.findById(studentId);
        if (student.isEmpty()) {
            throw new NoSuchElementException("Student Id " + studentId + " not found!");
        }
        Optional<Placement> placementOptional = placementRepo.findById(request.placementId());
        if (placementOptional.isEmpty()) {
            throw new NoSuchElementException("Placement Id " + request.placementId() + " not found!");
        }
         placementStudentRepo.acceptStudent(studentId,request.comment());
         placementStudentRepo.setPlacementId(studentId,request.placementId());
        return "Accepted "+request.studentName()+" for "+ request.companyName();
    }
}

