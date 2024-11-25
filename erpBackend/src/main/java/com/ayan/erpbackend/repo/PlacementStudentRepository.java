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
    @Query("UPDATE PlacementStudent SET acceptance=true, comments=:comment, date=CURRENT_TIMESTAMP WHERE student.id=:studentId")
   void acceptStudent(@Param("studentId") Long studentId, @Param("comment") String comment);

    @Modifying
    @Transactional
    @Query("UPDATE Student s SET s.placement.id = :placementId WHERE s.id = :studentId")
    void setPlacementId(@Param("studentId") Long studentId, @Param("placementId") Long placementId);

}

