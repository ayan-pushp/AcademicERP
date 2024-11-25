package com.ayan.erpbackend.repo;

import com.ayan.erpbackend.dto.StudentResponse;
import com.ayan.erpbackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT new com.ayan.erpbackend.dto.StudentResponse(" +
            "s.id, s.rollNumber, s.firstName, s.lastName, s.email, s.cgpa,s.domain.program,s.specialisation.name) " +
            "FROM Student s " +
            "WHERE s.domain in (SELECT pf.domain FROM PlacementFilter pf WHERE pf.placement.id=:placementId)"+
            "AND s.specialisation in (SELECT pf.specialisation FROM PlacementFilter pf WHERE pf.placement.id=:placementId)"+
            "AND s.cgpa >= (SELECT p.minimumGrade FROM Placement p WHERE p.id = :placementId) " +
            "AND s.placement.id IS NULL")
    List<StudentResponse> findEligibleStudents(@Param("placementId") Long placementId);

    @Query("SELECT new com.ayan.erpbackend.dto.StudentResponse(" +
            "s.id, s.rollNumber, s.firstName, s.lastName, s.email, s.cgpa,s.domain.program,s.specialisation.name) " +
            "FROM Student s " +
            "JOIN PlacementStudent ps ON s.id = ps.student.id " +
            "WHERE ps.placement.id = :placementId AND ps.acceptance is NULL")
    List<StudentResponse> findAppliedStudents(@Param("placementId") Long placementId);

}
