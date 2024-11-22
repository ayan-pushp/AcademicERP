package com.ayan.erpbackend.repo;

import com.ayan.erpbackend.dto.PlacementOfferResponse;
import com.ayan.erpbackend.entity.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlacementRepository extends JpaRepository<Placement, Long> {

    @Query(value = "SELECT o.name AS organisation_name, " +
            "o.address AS organisation_address, " +
            "p.description AS placement_description, " +
            "p.intake AS placement_intake, " +
            "p.minimum_grade AS placement_minimum_grade, " +
            "p.profile AS placement_profile, " +
            // Get eligible students: those who meet domain, specialisation, and CGPA requirements
            "GROUP_CONCAT(DISTINCT CONCAT(s.first_name, ' ', s.last_name) ORDER BY s.first_name) AS eligible_students, " +
            // Get applied students: those who have applied, without eligibility filtering
            "GROUP_CONCAT(DISTINCT CONCAT(s2.first_name, ' ', s2.last_name) ORDER BY s2.first_name) AS applied_students " + // Use s2 for applied students
            "FROM organisations o " +
            "JOIN placement p ON o.id = p.organisation_id " +
            "JOIN placement_filter pf ON pf.placement_id = p.id " +
            // First join to get eligible students: those who meet the eligibility criteria
            "JOIN student s ON s.domain = pf.domain AND s.specialisation = pf.specialisation AND s.cgpa >= p.minimum_grade " +
            // LEFT JOIN placement_student to get all students who applied, regardless of eligibility
            "LEFT JOIN placement_student ps ON ps.placement_id = p.id " +
            "LEFT JOIN student s2 ON ps.student_id = s2.id " +  // Join with student table to get applied students (using s2)
            "WHERE (:domain IS NULL OR s.domain = :domain) " +
            "AND (:specialisation IS NULL OR s.specialisation = :specialisation) " +
            "AND (:minGrade IS NULL OR s.cgpa >= :minGrade) " +
            // Group by placement and organisation to avoid duplicates
            "GROUP BY o.id, p.id " +
            "ORDER BY o.name, p.description", nativeQuery = true)
    List<Object[]> findOrganisationOffersWithFilteredStudents(
            @Param("domain") Long domain,
            @Param("specialisation") Long specialisation,
            @Param("minGrade") Float minGrade);
}