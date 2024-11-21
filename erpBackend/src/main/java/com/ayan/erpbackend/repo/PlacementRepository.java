package com.ayan.erpbackend.repo;

import com.ayan.erpbackend.dto.PlacementOfferResponse;
import com.ayan.erpbackend.entity.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlacementRepository extends JpaRepository<Placement, Long> {
    @Query("SELECT new com.ayan.erpbackend.dto.PlacementOfferResponse(" +
            "p.organisation, p.profile, p.description, p.minimumGrade, p.intake, " +
            "pf.specialisation, pf.domain) " +
            "FROM Placement p " +
            "JOIN PlacementFilter pf ON p.id = pf.placement.id")
    List<PlacementOfferResponse> findAllPlacementOffers();
}