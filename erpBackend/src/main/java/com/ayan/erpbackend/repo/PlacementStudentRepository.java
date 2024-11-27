package com.ayan.erpbackend.repo;

import com.ayan.erpbackend.entity.PlacementStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PlacementStudentRepository extends JpaRepository<PlacementStudent, Integer> {
    @Modifying
    @Transactional
    @Query("UPDATE PlacementStudent ps SET ps.acceptance=true, ps.comments=:comment, ps.date=CURRENT_TIMESTAMP" +
            " WHERE ps.student.id=:studentId AND ps.placement.id=:placementId " +
            "AND ps.student.domain in (SELECT pf.domain FROM PlacementFilter pf WHERE pf.placement.id=:placementId)"+
            "AND ps.student.specialisation in (SELECT pf.specialisation FROM PlacementFilter pf WHERE pf.placement.id=:placementId)" +
            "AND ps.student.cgpa >= (SELECT p.minimumGrade FROM Placement p WHERE p.id = :placementId)" +
            "AND ps.student.placement.id IS NULL")
   int acceptStudent(@Param("studentId") Long studentId, @Param("placementId") Long placementId, @Param("comment") String comment);

    @Modifying
    @Transactional
    @Query("UPDATE Student s SET s.placement.id = :placementId WHERE s.id = :studentId")
    int setPlacementId(@Param("studentId") Long studentId, @Param("placementId") Long placementId);

    @Modifying
    @Transactional
    @Query("UPDATE PlacementStudent ps SET ps.acceptance=false, ps.comments=:comment, ps.date=CURRENT_TIMESTAMP WHERE ps.student.id=:studentId AND ps.placement.id=:placementId ")
    int rejectStudent(@Param("studentId") Long studentId, @Param("placementId") Long placementId, @Param("comment") String comment);

}

